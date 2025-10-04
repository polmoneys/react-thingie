import createThingie from '../Thingie';

const TECH_STOCKS = [
    { code: 'AAPL', id: '0000' },
    { code: 'MSFT', id: '1111' },
    { code: 'GOOG', id: '2222' },
    { code: 'AMZN', id: '3333' },
    { code: 'TSLA', id: '4444' },
    { code: 'NVDA', id: '5555' },
    { code: 'META', id: '6666' },
];

interface Stock {
    code: string;
    id: string;
}

import StocksList from '../List';

export const Thingie = createThingie<Stock>('MyStockThingie');

export default function DemoList() {
    const { Thingie: ListProvider } = Thingie;
    return (
        <ListProvider
            items={TECH_STOCKS}
            keySelector={(s) => s.code}
            initialSelectedKeys={['AAPL']}
        >
            <StocksList />
        </ListProvider>
    );
}
