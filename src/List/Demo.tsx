import createThingie from '../Thingie';
import { type Stock,TECH_STOCKS } from '../utils';

import StocksList from '.';

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
