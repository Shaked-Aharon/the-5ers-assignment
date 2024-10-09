import { Button, Layout, Card, Spin, Pagination } from 'antd';
import { useMemo, useState } from 'react';
import { useStore } from '../../stores/store.provider';
import { observer } from 'mobx-react-lite';
import { StarFilled } from '@ant-design/icons';
import { Constant } from '../../constant';
import { Link } from 'react-router-dom';

const { Content } = Layout;


function FavoriteStocks() {
    const [currentPage, setCurrentPage] = useState(1);
    const { financialsStore } = useStore();

    const favoriteStock = useMemo(() => {
        const favoriteStocks = financialsStore.stocks.filter((stock, i) =>
            financialsStore.favorite.includes(stock.symbol)
        );
        console.log({favoriteStocks})
        return favoriteStocks;
    }, [financialsStore.stocks, financialsStore.favorite, currentPage])

    const stocksToShow = useMemo(() => {
        const start = (currentPage - 1) * Constant.general.PageSize;
        const end = start + Constant.general.PageSize;

        // Return the sliced array based on pagination
        return favoriteStock.slice(start, end);
    }, [favoriteStock])

    return (
        <Content className='h-full p-6 bg-gray-100'>
            <div className='flex gap-4'>
                <div className='flex-1'>
                    <Card
                        title="Stock List"
                        bordered={false}
                        className='h-full'
                    >
                        {financialsStore.loading ? <Spin tip="Loading" size="large" /> : <></>}
                        {
                            stocksToShow
                                .map(stock => <Card key={stock.name} title={stock.name} extra={
                                    (<>
                                        <Button
                                            onClick={() => { financialsStore.toggleFavorite(stock.symbol) }}
                                            className='mx-2'
                                            icon={<StarFilled />}
                                        ></Button>
                                        <Link to={`/details/${stock.symbol}`}>More</Link>

                                    </>
                                    )
                                } style={{ maxWidth: '100%' }} bodyStyle={{ display: 'none' }} />)
                        }
                        {/* Add stock list or placeholder here */}
                        <Pagination onChange={(page) => setCurrentPage(page)} className='mt-6' defaultCurrent={currentPage} pageSize={Constant.general.PageSize} total={favoriteStock.length} />
                    </Card>
                </div>
            </div>
        </Content>
    )
}

export default observer(FavoriteStocks);