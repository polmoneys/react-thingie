import { type ComponentProps } from 'react';

interface CommonProps
    extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
    value: string;
    onChange: (val: string) => void;
    id: string;
    errorElementId?: string;
}

export type TextInputLabelProps = CommonProps & {
    label: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
};

export type TextInputProps = CommonProps & {
    classNames?: {
        input?: string;
    };
};
