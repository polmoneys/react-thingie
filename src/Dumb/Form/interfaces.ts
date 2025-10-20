import type { ZodSchema } from 'zod';

/**
 * Ref methods exposed by UncontrolledForm for imperative operations
 */
export type UncontrolledFormRef = {
    /** Submits the form */
    submit: () => void;

    /** Resets the form to initial state and clears errors */
    reset: () => void;

    /** Gets all current form values */
    getValues: <
        T extends Record<string, any> = Record<string, FormDataEntryValue>,
    >() => T;

    /** Gets a specific field's current value */
    getFieldValue: (name: string) => FormDataEntryValue | null;

    /** Sets multiple field values at once */
    setValues: (values: Record<string, any>) => void;

    /** Sets a single field's value */
    setFieldValue: (name: string, value: any) => void;

    /** Focuses a field by name */
    focus: (name: string) => void;

    /** Validates entire form, returns error map or null if valid */
    validate: () => Promise<Record<string, string> | null>;

    /** Validates a single field, returns error message or null if valid */
    validateField: (name: string) => Promise<string | null>;

    /** Clears all validation error messages */
    clearErrors: () => void;
};

/**
 * Props for UncontrolledForm component
 */
export type UncontrolledFormProps<
    T extends Record<string, any> = Record<string, any>,
> = {
    /** Form content */
    children?: React.ReactNode;

    /** CSS class applied to form element */
    className?: string;

    /**
     * Called when form is successfully submitted after validation.
     * @param values - Validated values (strongly typed if using Zod)
     * @param raw - Raw FormData values
     * @param e - React form event
     */
    onSubmit?: (
        values: T,
        raw: { [k: string]: FormDataEntryValue },
        e: React.FormEvent<HTMLFormElement>,
    ) => Promise<void> | void;

    /** Initial field values to populate on mount */
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

    /**
     * When to trigger validation:
     * - 'submit': only on form submission
     * - 'blur': on field blur (debounced 150ms)
     * - 'change': on field value change (debounced 150ms)
     *
     * @default 'submit'
     */
    validateOn?: 'submit' | 'change' | 'blur';

    onValidationChange?: (a: any) => void;
};
