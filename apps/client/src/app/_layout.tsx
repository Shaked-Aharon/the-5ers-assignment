import {
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    StarOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Spin, Typography, theme } from 'antd';
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
        return <Spin fullscreen={true} tip="Loading" size="large" />;
    }

    // const isSidebarShouldBeSeen = useMemo(() => {
    //     if(window.innerWidth > 580) return authStore.isAuthenticated;
    //     return !collapsed
    // }, [authStore.isAuthenticated, collapsed])
    
    return (
        <Layout className='h-full'>
            <Sider trigger={null} collapsible collapsed={collapsed} className={authStore.isAuthenticated ? '' : 'hidden'}>
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
                <Header style={{ padding: 0, background: colorBgContainer }} className={authStore.isAuthenticated ? '' : 'hidden'}>
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
                    <Title level={3} className='inline'>Hey {authStore.user?.name} <span className='hidden md:inline'>| Stock Portfolio</span></Title>
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