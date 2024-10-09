import { Input, Button, Layout, Card, InputRef, Spin, Pagination } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { useStore } from '../../stores/store.provider';
import { observer } from 'mobx-react-lite';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Constant } from '../../constant';
import { Link } from 'react-router-dom';

const { Content } = Layout;


function HomePage() {
    const searchRef = useRef<InputRef>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { financialsStore } = useStore();

    const handleSearch = () => {
        const searchTerm = searchRef?.current?.input?.value;
        if (searchTerm) {
            financialsStore.searchStocks(searchTerm)
            return;
        }
        financialsStore.initialData();
    }

    const stocksToShow = useMemo(() => {
        const start = (currentPage - 1) * Constant.general.PageSize;
        const end = start + Constant.general.PageSize;

        // Return the sliced array based on pagination
        return financialsStore.stocks.slice(start, end);
    }, [financialsStore.stocks, currentPage])

    return (
        <Content className='h-full p-6 bg-gray-100'>
            <div className='flex gap-4'>
                <div className='flex m-w-[200px] h-8'>
                    <Input ref={searchRef} className='rounded-r-none' />
                    <Button
                        onClick={handleSearch}
                        type="primary"
                        className='rounded-l-none'
                        icon={<span role="img" aria-label="search">🔍</span>}
                    ></Button>
                </div>
                <div className='flex-1' style={{ maxWidth: 'calc(100% - 200px)' }}>
                    <Card
                        title="Stock List"
                        bordered={false}
                        className='h-full overflow-y-auto'
                    >
                        {financialsStore.loading ? <Spin tip="Loading" size="large" /> : <></>}
                        {
                            (financialsStore.loading ? [] : stocksToShow)
                                .map((stock, i) => <Card key={`${i}-${stock.symbol}-${stock.name}`} title={stock.name} extra={
                                    (<>
                                        <Button
                                            onClick={() => { financialsStore.toggleFavorite(stock.symbol) }}
                                            className='mx-2'
                                            icon={financialsStore.favorite.includes(stock.symbol) ? <StarFilled /> : <StarOutlined />}
                                        ></Button>
                                        <Link to={`/details/${stock.symbol}`}>More</Link>
                                    </>
                                    )
                                } style={{ maxWidth: '100%' }} bodyStyle={{ display: 'none' }} />)
                        }
                        {/* Add stock list or placeholder here */}
                        <Pagination onChange={(page) => setCurrentPage(page)} className='mt-6' defaultCurrent={currentPage} pageSize={Constant.general.PageSize} total={financialsStore.stocks.length} />
                    </Card>
                </div>
            </div>
        </Content>
    )
}

export default observer(HomePage);