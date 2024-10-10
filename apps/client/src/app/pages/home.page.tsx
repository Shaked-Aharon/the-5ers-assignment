import { Input, Button, Layout, InputRef } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { useStore } from '../../stores/store.provider';
import { observer } from 'mobx-react-lite';
import { Constant } from '../../constant';
import StockListComponent from '../components/stock-list.component';

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
            <div className='flex gap-4 flex-col md:flex-row'>
                <div className='flex m-w-[200px] h-8'>
                    <Input ref={searchRef} className='rounded-r-none' />
                    <Button
                        onClick={handleSearch}
                        type="primary"
                        className='rounded-l-none'
                        icon={<span role="img" aria-label="search">🔍</span>}
                    ></Button>
                </div>
                <div className='flex-1 w-full md:w-[calc(100%-200px)]'>
                    <StockListComponent
                        favorite={financialsStore.favorite}
                        isLoading={financialsStore.loading}
                        stocks={financialsStore.stocks}
                        toggleFavorite={(symbol) => financialsStore.toggleFavorite(symbol)}
                    />
                </div>
            </div>
        </Content>
    )
}

export default observer(HomePage);