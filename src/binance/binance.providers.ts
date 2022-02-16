import { Spot } from '@binance/connector';
export const binanceProviders = [
    {
        provide: 'BINANCE_CONNECTION',
        useFactory: async () =>
            new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_API_SECRET),
    },
];
