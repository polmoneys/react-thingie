import {
    type FormEvent,
    forwardRef,
    type ReactElement,
    type ReactNode,
    type Ref,
    type RefObject,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import type { ZodSchema } from 'zod';

import {
    collectFormValuesNormalized,
    getFormElement,
    isZodSchema,
    zodErrorsToMap,
} from './utils';

type ErrorsMap = Record<string, string>;

export type UncontrolledFormHandle<T> = {
    validate: () => Promise<boolean>;
    submit: () => Promise<void>;
    getValues: () => Record<string, any> | T;
};

type UncontrolledFormProps<T extends Record<string, any>> = {
    validate?: ZodSchema<T> | undefined;
    onSubmit: (values: T) => Promise<void> | void;
    defaultValues?: Partial<T>;
    /**
     * Optional transform applied per-field after normalization.
     * Example: (name, raw) => typeof raw === 'string' ? raw.trim() : raw
     */
    valueTransform?: (name: string, rawValue: any) => any;
    children: (opts: {
        errors: ErrorsMap;
        submitting: boolean;
        formRef: RefObject<HTMLFormElement | null>;
        validate: () => Promise<boolean>;
        submit: () => Promise<void>;
        getValues: () => Record<string, any>;
    }) => ReactNode;
    className?: string;
    id?: string;
    noValidate?: boolean;
};

function UncontrolledFormInner<T extends Record<string, any>>(
    props: UncontrolledFormProps<T>,
    ref: Ref<UncontrolledFormHandle<T>> | null,
) {
    const {
        validate: schema,
        onSubmit,
        children,
        defaultValues,
        valueTransform,
        ...rest
    } = props;
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = useState<ErrorsMap>({});
    const [submitting, setSubmitting] = useState(false);

    const getValues = useCallback(() => {
        return collectFormValuesNormalized(formRef.current, valueTransform);
    }, [valueTransform]);

    const validate = useCallback(async (): Promise<boolean> => {
        const form = formRef.current;
        if (!form) return true;

        const raw = collectFormValuesNormalized(form, valueTransform) as Record<
            string,
            any
        >;

        if (schema && isZodSchema(schema)) {
            try {
                const result = await schema.safeParseAsync(raw);
                if (result.success) {
                    setErrors({});
                    return true;
                } else {
                    const mapped = zodErrorsToMap(result.error);
                    setErrors(mapped);
                    const firstKey = Object.keys(mapped)[0];
                    if (firstKey) {
                        const el = getFormElement(form, firstKey);
                        try {
                            if ((el as any)?.focus) (el as any).focus();
                            else {
                                const nodes = form.querySelectorAll(
                                    `[name="${firstKey}"]`,
                                );
                                if (nodes[0] && (nodes[0] as HTMLElement).focus)
                                    (nodes[0] as HTMLElement).focus();
                            }
                        } catch {
                            //
                        }
                    }
                    return false;
                }
            } catch {
                setErrors({ _form: 'Validation failed' });
                return false;
            }
        }

        setErrors({});
        return true;
    }, [schema, valueTransform]);

    const submit = useCallback(async (): Promise<void> => {
        const form = formRef.current;
        if (!form) return;

        setSubmitting(true);
        try {
            const raw = collectFormValuesNormalized(
                form,
                valueTransform,
            ) as Record<string, any>;
            if (schema && isZodSchema(schema)) {
                const parsed = await schema.safeParseAsync(raw);
                if (!parsed.success) {
                    const mapped = zodErrorsToMap(parsed.error);
                    setErrors(mapped);
                    const firstKey = Object.keys(mapped)[0];
                    if (firstKey) {
                        const el = getFormElement(form, firstKey);
                        try {
                            if ((el as any)?.focus) (el as any).focus();
                            else {
                                const nodes = form.querySelectorAll(
                                    `[name="${firstKey}"]`,
                                );
                                if (nodes[0] && (nodes[0] as HTMLElement).focus)
                                    (nodes[0] as HTMLElement).focus();
                            }
                        } catch {
                            //
                        }
                    }
                    return;
                }
                setErrors({});
                await onSubmit(parsed.data as T);
            } else {
                setErrors({});
                await onSubmit(raw as T);
            }
        } finally {
            setSubmitting(false);
        }
    }, [onSubmit, schema, valueTransform]);

    useImperativeHandle(
        ref,
        () => ({
            validate,
            submit,
            getValues,
        }),
        [validate, submit, getValues],
    );

    const handleNativeSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await submit();
        },
        [submit],
    );

    return (
        <form
            ref={formRef}
            onSubmit={handleNativeSubmit}
            noValidate
            {...(rest as any)}
        >
            {children({
                errors,
                submitting,
                formRef,
                validate,
                submit,
                getValues,
            })}
        </form>
    );
}

export const UncontrolledForm = forwardRef(UncontrolledFormInner) as <
    T extends Record<string, any>,
>(
    props: UncontrolledFormProps<T> & {
        ref?: Ref<UncontrolledFormHandle<T>>;
    },
) => ReactElement;

export default UncontrolledForm;
