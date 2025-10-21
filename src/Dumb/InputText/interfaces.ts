import { type ChangeEvent, type ComponentProps, type ReactNode } from 'react';

interface CommonProps extends Omit<ComponentProps<'input'>, 'onChange'> {
    onChange: (val: string) => void;
    onChangeNative?: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    errorElementId?: string;
}

export type TextInputLabelProps = CommonProps & {
    label: string | ReactNode;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    classNames?: {
        input?: string;
    };
};

export type TextInputProps = CommonProps & {
    classNames?: {
        input?: string;
    };
};
