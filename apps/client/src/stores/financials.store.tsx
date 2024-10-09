import { makeAutoObservable, runInAction } from 'mobx';
import { IErrResponse, IStock, IUser } from '../interfaces';
import { list, search } from '../services/financials.service';
import { Constant } from '../constant';

class FinancialsStore {
  stocks: IStock[] = [];
  selected: IStock | null = null;
  loading: boolean = false;
  favorite: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initialData();
  }

  get favotireStocks(){
    return this.stocks.filter(stock => this.favorite.includes(stock.symbol));
  }

  setStocks(stocks: IStock[]) {
    this.stocks = stocks;
  }

  toggleFavorite(symbol: string) {
    runInAction(() => {
      const index = this.favorite.indexOf(symbol);
      this.favorite = index === -1 ? [...this.favorite, symbol] : this.favorite.filter(stock => stock !== symbol);
      localStorage.setItem(Constant.localStorageKeys.Favorite, JSON.stringify(this.favorite))
    });
  }

  async searchStocks(searchTerm: string) {
    this.loading = true;
    try {
      // Simulate an API call
      const stocks: IStock[] | IErrResponse = await search(searchTerm);
      if ('error' in stocks) throw stocks;
      runInAction(() => {
        this.setStocks(stocks);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.error('Failed to search stocks', error);
    }
  }

  // Example method to simulate fetching user details (use real API call in production)
  async initialData() {
    if(!localStorage.getItem('token')) return;
    this.loading = true;
    try {
      // Simulate an API call
      const stocks: IStock[] | IErrResponse = await list();
      if ('error' in stocks) throw stocks;
      runInAction(() => {
        this.favorite = JSON.parse(localStorage.getItem(Constant.localStorageKeys.Favorite) ?? '[]');
        this.setStocks(stocks);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.error('Failed to search stocks', error);
    }
  }
}

const financialsStore = new FinancialsStore();
export default financialsStore;
