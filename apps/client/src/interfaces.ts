export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IErrResponse {
    error: string;
    message: string;
    statusCode: number;
}

export interface IStock {
    symbol: string;
    name: string;
    currency: string;
    price: number;
    stockExchange: string;
    exchangeShortName: string;
}

export interface IDetailedStock  {
    symbol: string;
    price: number;
    beta: number;
    volAvg: number;
    mktCap: number;
    lastDiv: number;
    range: string;
    changes: number;
    companyName: string;
    currency: string;
    cik: string;
    isin: string;
    cusip: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    country: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dcfDiff: number;
    dcf: number;
    image: string;
    ipoDate: string;
    defaultImage: boolean;
    isEtf: boolean;
    isActivelyTrading: boolean;
    isAdr: boolean;
    isFund: boolean;
}