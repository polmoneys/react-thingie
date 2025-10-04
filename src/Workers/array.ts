type Item = Record<string, any>;
let data: Item[] | null = null;

self.addEventListener('message', (ev) => {
    const { __rpcId, action, payload } = ev.data ?? {};
    const respond = (ok: boolean, result?: any, error?: any) => {
        self.postMessage({ __rpcId, ok, result, error });
    };

    try {
        if (action === 'setData') {
            // payload.data: Item[]
            data = payload.data;
            respond(true, { length: data?.length }, null);
            return;
        }

        if (action === 'filterMap') {
            // payload: { predicate: {type:'keyEq', key:'foo', val: 42} | custom, map: 'pickKey'|'custom'... }
            if (!data) {
                respond(false, null, 'No data set');
                return;
            }
            const { predicate, map } = payload;
            const out: any[] = [];
            // simple example predicates and mapping — avoid eval in production
            const predFn = (obj: Item) => {
                if (predicate?.type === 'keyEq')
                    return obj[predicate.key] === predicate.val;
                if (predicate?.type === 'gte')
                    return obj[predicate.key] >= predicate.val;
                if (predicate?.type === 'custom') {
                    const fn = new Function('obj', predicate.fnBody);
                    return !!fn(obj);
                }
                return true;
            };
            const mapFn = (obj: Item) => {
                if (!map) return obj;
                if (map.type === 'pickKey') return obj[map.key];
                if (map.type === 'custom') {
                    const fn = new Function('obj', map.fnBody);
                    return fn(obj);
                }
                return obj;
            };

            for (let i = 0; i < data.length; i++) {
                const it = data[i];
                if (predFn(it)) out.push(mapFn(it));
            }
            respond(true, { result: out }, null);
            return;
        }

        if (action === 'getLength') {
            respond(true, { length: data?.length ?? 0 }, null);
            return;
        }

        respond(false, null, `Unknown action ${action}`);
    } catch (err) {
        respond(false, null, String(err));
    }
});

export {};
