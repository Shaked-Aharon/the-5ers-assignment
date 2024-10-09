import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { register } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const onFinish = (values: any) => {
        setErr('');
        console.log('Success:', values);
        register({ ...values, confirmPassword: undefined }).then(result => {
            if ('error' in result) {
                setErr(result.message);
                return;
            }
            navigate('/login');
        }).catch(err => console.log({ err }));
        // Add your registration logic here
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Register</Title>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.ErrorList errors={[err]} className='text-red-500'/>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>
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

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <Typography.Text>Already have an account? <a href="/login">Login</a></Typography.Text>
            </Card>
        </div>
    );
};

export default RegisterPage;
