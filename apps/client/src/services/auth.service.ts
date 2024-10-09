import { IErrResponse, ILoginRequest, ILoginResponse, IRegisterRequest } from "../interfaces";

export const register = (newUser: IRegisterRequest): Promise<any | IErrResponse> => {
    return fetch('http://localhost:3000/api/auth/register', {
        body: JSON.stringify(newUser), method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export const login = (user: ILoginRequest): Promise<ILoginResponse | IErrResponse> => {
    return fetch('http://localhost:3000/api/auth/login', {
        body: JSON.stringify(user), method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}