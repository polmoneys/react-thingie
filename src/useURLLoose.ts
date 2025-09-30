import { parseAsStringLiteral, useQueryState } from 'nuqs';

type LooseT<T extends string> = T | (string & {});

type Query = LooseT<'dialog' | 'tray' | 'sheet' | 'cart'>;

export default function useURLLoose(queries: Array<Query>) {
    const [state, setState] = useQueryState(
        'looseURL',
        parseAsStringLiteral(queries),
    );

    const onOpen = (query: Query) => setState(query);
    const onClose = () => setState(null);

    return {
        state,
        onClose,
        onOpen,
    };
}
