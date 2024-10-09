import {
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    StarOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/store.provider';
import { observer } from 'mobx-react-lite';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;
function RootLayout({ children }: React.PropsWithChildren) {
    const navigate = useNavigate();
    const location = useLocation();
    const { authStore } = useStore();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    if (authStore.loading) {
        return <div>Loading...</div>;
    }
    return (
        <Layout className='h-full'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/',
                            icon: <HomeOutlined />,
                            label: 'Home',
                            onClick: () => navigate('/')
                        },
                        {
                            key: '/favorite',
                            icon: <StarOutlined />,
                            label: 'Favorite Stocks',
                            onClick: () => navigate('/favorite')
                        },
                        // {
                        //     key: '3',
                        //     icon: <UploadOutlined />,
                        //     label: 'nav 3',
                        // },
                        {
                            style: {
                                position: 'absolute',
                                bottom: 0
                            },
                            key: '99',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            onClick: () => {
                                localStorage.removeItem('token');
                                navigate('/login');
                            }
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Title level={3} className='inline'>Hey {authStore.user?.name}, your stock portfolio</Title>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default observer(RootLayout);