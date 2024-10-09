import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FinancialsService {
    private readonly baseUrl = 'https://financialmodelingprep.com/api/v3'; // Replace with the actual base URL of the API
    private readonly apiKey = 'YfTqmXFxEf4lPX3Wb9E16p2wkD3K5eAk'; // Replace with your actual API key if required

    async search(searchQuery: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/search?query=${searchQuery}&apikey=${this.apiKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // If the third-party API returns an error response
                throw new HttpException(error.response.data, error.response.status);
            } else {
                // If there is a network or server error
                throw new HttpException('Failed to fetch data from the third-party API', HttpStatus.BAD_REQUEST);
            }
        }
    }

    async list(): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/stock/list?apikey=${this.apiKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // If the third-party API returns an error response
                throw new HttpException(error.response.data, error.response.status);
            } else {
                // If there is a network or server error
                throw new HttpException('Failed to fetch data from the third-party API', HttpStatus.BAD_REQUEST);
            }
        }
    }

    async getDetails(symbol: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/profile/${symbol}?apikey=${this.apiKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // If the third-party API returns an error response
                throw new HttpException(error.response.data, error.response.status);
            } else {
                // If there is a network or server error
                throw new HttpException('Failed to fetch data from the third-party API', HttpStatus.BAD_REQUEST);
            }
        }
    }

}
