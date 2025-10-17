import { startTransition, useCallback, useMemo } from 'react';

import { useQueryState } from 'nuqs';

type UseQueryInputOptions = {
    key?: string;
    history?: 'push' | 'replace';
    throttleMs?: number;
    defaultValue?: string;
};

/*

  const { inputProps, clear } = useQueryInput({
    key: 'query',
    throttleMs: 250,
    defaultValue: '',
  })

      <TextInputLabel
      placeholder="Type…"
      {...inputProps}
      />

*/

export default function useQueryInput(opts?: UseQueryInputOptions) {
    const {
        key = 'query',
        history = 'replace',
        throttleMs,
        defaultValue = '',
    } = opts ?? {};

    const [value, setValue] = useQueryState(key, {
        defaultValue,
        history,
        throttleMs,
    });

    const onChange = useCallback(
        (v: string) => {
            if (v === '') {
                // remove key
                setValue(null);
            } else {
                startTransition(() => {
                    setValue(v);
                });
            }
        },
        [setValue],
    );

    const clear = useCallback(() => setValue(null), [setValue]);

    const inputProps = useMemo(
        () => ({
            value: value ?? '',
            onChange,
        }),
        [value, onChange],
    );

    return {
        inputProps,
        value: value ?? '',
        setValue,
        clear,
    };
}
