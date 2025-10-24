import type { ZodSchema } from 'zod';

export type UncontrolledFormRef = {
    submit: () => void;
    reset: () => void;
    getValues: <
        T extends Record<string, any> = Record<string, FormDataEntryValue>,
    >() => T;
    getFieldValue: (name: string) => FormDataEntryValue | null;
    setValues: (values: Record<string, any>) => void;
    setFieldValue: (name: string, value: any) => void;
    focus: (name: string) => void;
    validate: () => Promise<Record<string, string> | null>;
    validateField: (name: string) => Promise<string | null>;
    clearErrors: () => void;
};

export type UncontrolledFormProps<
    T extends Record<string, any> = Record<string, any>,
> = {
    children?: React.ReactNode;
    className?: string;
    onSubmit?: (
        values: T,
        raw: { [k: string]: FormDataEntryValue },
        e: React.FormEvent<HTMLFormElement>,
    ) => Promise<void> | void;

    initialValues?: Partial<T>;
    /**
     * Validation schema or function.
     * - Zod schema: must have safeParseAsync method
     * - Custom function: should return error map (fieldName -> message) or null
     */
    validate?:
        | ZodSchema<T>
        | ((values: {
              [k: string]: FormDataEntryValue;
          }) =>
              | Promise<Record<string, string> | null>
              | Record<string, string>
              | null);

    validateOn?: 'submit' | 'change' | 'blur';
    onValidationChange?: (a: any) => void;
};
