import { Constant } from "../constant";
import { IErrResponse, IUser } from "../interfaces";

export const profile = (): Promise<IUser | IErrResponse> => {
    return fetch('http://localhost:3000/api/users/profile', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(Constant.localStorageKeys.Token)
        },
    }).then(res => res.json());
}