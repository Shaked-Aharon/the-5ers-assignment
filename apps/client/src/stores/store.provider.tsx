import React, { createContext, ReactNode, useContext } from 'react';
import authStore from './auth.store';
import financialsStore from './financials.store';

const store = {
    authStore,
    financialsStore
};

const StoreContext = createContext(store);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
