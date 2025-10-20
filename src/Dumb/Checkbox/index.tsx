import {
    type ChangeEventHandler,
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

import { has } from '../../utils';
import Font from '../Font';
import Ring from '../Ring';

/*
  Controlled: pass `checked={true|false|'mixed'}`.
  Uncontrolled: omit `checked` and use `defaultChecked` as usual.

  <Checkbox id="first" checked onChange={onChange}

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
       const el = e.currentTarget;

       // if indeterminate -> 'mixed'
       const value: TriState = el.indeterminate
           ? 'mixed'
           : el.checked;

         // 'mixed' | true | false
        return value
   }
*/

export type TriState = boolean | 'mixed';

export interface CheckboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'checked' | 'className'
    > {
    checked?: TriState;
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    children?: ReactNode;
    label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const { checked, defaultChecked, onChange, id, children, label, ...rest } =
        props;
    const innerRef = useRef<HTMLInputElement | null>(null);

    if (id === undefined) console.warn('checkbox needs an ID ');
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    useEffect(() => {
        const node = innerRef.current;
        if (!node) return;

        if (checked === 'mixed') {
            node.indeterminate = true;
            node.checked = false;
        } else if (typeof checked === 'boolean') {
            node.indeterminate = false;
            node.checked = checked;
        } else {
            // uncontrolled usage: ensure .indeterminate cleared
            node.indeterminate = false;
        }
    }, [checked]);

    return (
        <>
            <Ring>
                <input
                    type="checkbox"
                    id={id ?? 'checkbox'}
                    ref={innerRef}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    {...rest}
                />
            </Ring>
            {has(label) ? <Font>{label}</Font> : null}
            {has(children) ? children : null}
        </>
    );
});

Checkbox.displayName = 'CheckboxIndeterminate';

export default Checkbox;
