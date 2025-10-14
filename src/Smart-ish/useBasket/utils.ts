import type { Action, BasketState, Id, Ids } from './interfaces';

function dedupePreserveOrder(arr: Ids) {
    const s = new Set<Id>();
    const out: Ids = [];
    for (const a of arr) {
        if (!s.has(a)) {
            s.add(a);
            out.push(a);
        }
    }
    return out;
}

export function reducer(state: BasketState, action: Action): BasketState {
    switch (action.type) {
        case 'ADD':
            return {
                selected: dedupePreserveOrder([
                    ...state.selected,
                    ...action.ids,
                ]),
            };
        case 'REMOVE':
            return {
                selected: state.selected.filter(
                    (id) => !action.ids.includes(id),
                ),
            };
        case 'TOGGLE':
            return state.selected.includes(action.id)
                ? { selected: state.selected.filter((x) => x !== action.id) }
                : { selected: [...state.selected, action.id] };
        case 'SET':
            return { selected: dedupePreserveOrder(action.ids) };
        case 'CLEAR':
            return { selected: [] };
        default:
            return state;
    }
}
