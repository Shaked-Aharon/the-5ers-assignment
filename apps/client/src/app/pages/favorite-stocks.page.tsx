import { Layout } from 'antd';
import { useMemo } from 'react';
import { useStore } from '../../stores/store.provider';
import { observer } from 'mobx-react-lite';
import StockListComponent from '../components/stock-list.component';

const { Content } = Layout;


function FavoriteStocks() {
    const { financialsStore } = useStore();

    const favoriteStock = useMemo(() => {
        const favoriteStocks = financialsStore.stocks.filter((stock, i) =>
            financialsStore.favorite.includes(stock.symbol)
        );
        return favoriteStocks;
    }, [financialsStore.stocks, financialsStore.favorite])

    return (
        <Content className='h-full p-6 bg-gray-100'>
            <div className='flex gap-4 overflow-x-auto'>
                <div className='flex-1'>
                <StockListComponent
                        favorite={financialsStore.favorite}
                        isLoading={financialsStore.loading}
                        stocks={favoriteStock}
                        toggleFavorite={(symbol) => financialsStore.toggleFavorite(symbol)}
                    />
                </div>
            </div>
        </Content>
    )
}

export default observer(FavoriteStocks);