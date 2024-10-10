import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Card, Spin, Button, Pagination } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Constant } from "../../constant";
import { IStock } from "../../interfaces";

interface IStockListComponentProps {
    favorite: string[];
    stocks: IStock[];
    isLoading: boolean;
    toggleFavorite: (symbol: string) => void
}

const StockListComponent: React.FC<IStockListComponentProps> = ({ favorite, isLoading, stocks, toggleFavorite }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const stocksToShow = useMemo(() => {
        const start = (currentPage - 1) * Constant.general.PageSize;
        const end = start + Constant.general.PageSize;

        // Return the sliced array based on pagination
        return stocks.slice(start, end);
    }, [stocks, currentPage]);
    return (
        <Card
            title="Stock List"
            bordered={false}
            className='h-full overflow-y-auto'
        >
            {isLoading ? <Spin tip="Loading" size="large" /> : <></>}
            <div className='overflow-y-auto h-[calc(100vh-420px)]'>
                {
                    (isLoading ? [] : stocksToShow)
                        .map((stock, i) => <Card key={`${i}-${stock.symbol}-${stock.name}`} title={stock.name} extra={
                            (<>
                                <Button
                                    onClick={() => { toggleFavorite(stock.symbol) }}
                                    className='mx-2'
                                    icon={favorite.includes(stock.symbol) ? <StarFilled /> : <StarOutlined />}
                                ></Button>
                                <Link to={`/details/${stock.symbol}`}>More</Link>
                            </>
                            )
                        } style={{ maxWidth: '100%' }} bodyStyle={{ display: 'none' }} />)
                }
            </div>
            {/* Add stock list or placeholder here */}
            <Pagination showSizeChanger={false} onChange={(page) => setCurrentPage(page)} className='mt-6' defaultCurrent={currentPage} defaultPageSize={Constant.general.PageSize} total={stocks.length} />
        </Card>
    )
}

export default StockListComponent;