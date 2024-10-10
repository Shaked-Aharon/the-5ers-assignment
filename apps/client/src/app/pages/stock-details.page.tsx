import { Button, Card, Col, Divider, Row, Spin, Tag, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getDetails } from "../../services/financials.service";
import { IDetailedStock } from "../../interfaces";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export function StockDetails() {
    const navigate = useNavigate();
    const { symbol } = useParams();
    const [err, setErr] = useState('')
    const [stock, setStock] = useState<undefined | IDetailedStock>();
    useEffect(() => {
        if (!symbol) return;
        setErr('');
        getDetails(symbol).then(res => {
            if ('Error Message' in res) {
                setErr(res["Error Message"] as string)
                return;
            }
            setStock((res as IDetailedStock[])[0])
        });
    }, [symbol])

    if (!stock && !err) return <Spin tip="Loading" size="large" />

    return (
        <Content className='h-full p-6 bg-gray-100 overflow-y-auto'>
            {err}
            {
                stock ? <div className='flex gap-4'>
                    <div className='flex-1'>
                        <Card
                            title={<><Button onClick={() => { navigate(-1) }} type="text"><LeftOutlined /></Button> Stock Details</>}
                            bordered={false}
                            className='h-full'
                        >
                            {err}
                            <Row gutter={24}>
                                <Col span={8}>
                                    <img
                                        width={200}
                                        src={stock.image}
                                        alt={stock.companyName}
                                    />
                                </Col>
                                <Col span={16}>
                                    <Title level={2}>{stock.companyName}</Title>
                                    <Text strong>Symbol: </Text> {stock.symbol} <br />
                                    <Text strong>Exchange: </Text> {stock.exchange} ({stock.exchangeShortName}) <br />
                                    <Text strong>Industry: </Text> {stock.industry} <br />
                                    <Text strong>Sector: </Text> {stock.sector} <br />
                                    <Text strong>CEO: </Text> {stock.ceo} <br />
                                    <Text strong>Website: </Text> <a href={stock.website} target="_blank" rel="noopener noreferrer">{stock.website}</a>
                                </Col>
                            </Row>

                            <Divider />

                            <Row gutter={24}>
                                <Col span={12}>
                                    <Title level={4}>Financial Information</Title>
                                    <Text strong>Price: </Text> {stock.price} {stock.currency} <br />
                                    <Text strong>Market Cap: </Text> {stock.mktCap} {stock.currency} <br />
                                    <Text strong>Volume Average: </Text> {stock.volAvg} <br />
                                    <Text strong>Beta: </Text> {stock.beta} <br />
                                    <Text strong>Last Dividend: </Text> {stock.lastDiv} <br />
                                    <Text strong>DCF: </Text> {stock.dcf} <br />
                                    <Text strong>DCF Difference: </Text> {stock.dcfDiff} <br />
                                    <Text strong>Range: </Text> {stock.range} <br />
                                </Col>
                                <Col span={12}>
                                    <Title level={4}>Company Details</Title>
                                    <Text strong>Country: </Text> {stock.country} <br />
                                    <Text strong>Address: </Text> {stock.address}, {stock.city}, {stock.state}, {stock.zip} <br />
                                    <Text strong>Phone: </Text> {stock.phone} <br />
                                    <Text strong>IPO Date: </Text> {stock.ipoDate} <br />
                                    <Text strong>Employees: </Text> {stock.fullTimeEmployees} <br />
                                    <Text strong>CUSIP: </Text> {stock.cusip} <br />
                                    <Text strong>ISIN: </Text> {stock.isin} <br />
                                    <Text strong>CIK: </Text> {stock.cik} <br />
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col span={24}>
                                    <Title level={4}>Description</Title>
                                    <Paragraph>{stock.description}</Paragraph>
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col span={24}>
                                    <Title level={4}>Tags</Title>
                                    <Tag color={stock.isActivelyTrading ? 'green' : 'red'}>
                                        {stock.isActivelyTrading ? 'Actively Trading' : 'Not Actively Trading'}
                                    </Tag>
                                    {stock.isEtf && <Tag color="blue">ETF</Tag>}
                                    {stock.isAdr && <Tag color="orange">ADR</Tag>}
                                    {stock.isFund && <Tag color="purple">Fund</Tag>}
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div> : <></>
            }
        </Content>
    )
}