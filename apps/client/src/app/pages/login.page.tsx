import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { useStore } from '../../stores/store.provider';
import { Constant } from '../../constant';

const { Title } = Typography;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {authStore, financialsStore} = useStore();
    const [err, setErr] = useState('');
    const onFinish = (values: any) => {
        setErr('');
        login({ ...values, confirmPassword: undefined }).then(result => {
            if ('error' in result) {
                setErr(result.message);
                return;
            }
            localStorage.setItem(Constant.localStorageKeys.Token, result.accessToken)
            authStore.fetchUser().then(() => {navigate('/'); financialsStore.initialData();});
        }).catch(err => console.log({ err }));
        // Add your login logic here
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Login</Title>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.ErrorList errors={[err]} className='text-red-500'/>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Typography.Text>Don't have an account? <a href="/register">Register</a></Typography.Text>
            </Card>
        </div>
    );
};

export default LoginPage;
