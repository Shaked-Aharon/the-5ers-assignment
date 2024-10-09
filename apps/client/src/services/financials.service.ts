import { Constant } from "../constant";
import { IDetailedStock, IErrResponse, IStock } from "../interfaces";

export const search = (q: string): Promise<IStock[] | IErrResponse> => {
    return fetch(`http://localhost:3000/api/financials/search?q=${q}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(Constant.localStorageKeys.Token)
        },
    }).then(res => res.json());
}

export const list = (): Promise<IStock[] | IErrResponse> => {
    return fetch(`http://localhost:3000/api/financials/list`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(Constant.localStorageKeys.Token)
        },
    }).then(res => res.json());
}

export const getDetails = (symbol: string): Promise<IDetailedStock[] | IErrResponse> => {
    return fetch(`http://localhost:3000/api/financials/details/${symbol}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(Constant.localStorageKeys.Token)
        },
    }).then(res => res.json());
}