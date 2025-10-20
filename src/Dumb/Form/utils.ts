import type { ZodSchema } from 'zod';

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const collectFormValues = (
    form: HTMLFormElement | null,
): Record<string, FormDataEntryValue> => {
    if (!form) return {};
    return Object.fromEntries(new FormData(form) as any);
};

/**
 * Collect form values and normalize common types:
 *  - single checkbox -> boolean
 *  - multiple checkboxes with same name -> string[] of checked values
 *  - radios -> selected value or null
 *  - select[multiple] -> string[]
 *  - files -> FileList
 *  - other inputs -> string
 *
 * Optionally apply valueTransform(name, rawValue) to each field before returning.
 */
export const collectFormValuesNormalized = (
    form: HTMLFormElement | null,
    valueTransform?: (name: string, rawValue: any) => any,
): Record<string, any> => {
    const out: Record<string, any> = {};
    if (!form) return out;

    const elements = Array.from(form.elements) as any[];

    // group by name
    const groups = new Map<string, any[]>();
    elements.forEach((el) => {
        if (!el || !el.name || el.disabled) return;
        const name = el.name;
        if (!groups.has(name)) groups.set(name, []);
        groups.get(name)!.push(el);
    });

    for (const [name, els] of groups.entries()) {
        let rawValue: any;

        if (els.length === 1) {
            const el = els[0];
            if (el instanceof HTMLInputElement) {
                if (el.type === 'checkbox') {
                    rawValue = el.checked;
                } else if (el.type === 'radio') {
                    rawValue = el.checked ? el.value : null;
                } else if (el.type === 'file') {
                    rawValue = el.files;
                } else {
                    rawValue = el.value;
                }
            } else if (el instanceof HTMLSelectElement) {
                if (el.multiple) {
                    rawValue = Array.from(el.selectedOptions).map(
                        (o) => o.value,
                    );
                } else {
                    rawValue = el.value;
                }
            } else if (el instanceof HTMLTextAreaElement) {
                rawValue = el.value;
            } else {
                rawValue = (el as any).value ?? null;
            }
        } else {
            // multiple elements with same name -> determine type
            const allCheckbox = els.every(
                (e: any) =>
                    e instanceof HTMLInputElement && e.type === 'checkbox',
            );
            const allRadio = els.every(
                (e: any) => e instanceof HTMLInputElement && e.type === 'radio',
            );

            if (allCheckbox) {
                rawValue = els
                    .filter((e: any) => e.checked)
                    .map((e: any) => e.value);
            } else if (allRadio) {
                const checked = els.find((e: any) => e.checked);
                rawValue = checked ? checked.value : null;
            } else {
                // fallback: array of values / booleans for checkboxes
                rawValue = els.map((e: any) => {
                    if (e instanceof HTMLInputElement && e.type === 'checkbox')
                        return e.checked;
                    if (e instanceof HTMLInputElement && e.type === 'file')
                        return e.files;
                    return e.value ?? null;
                });
            }
        }

        const transformed =
            typeof valueTransform === 'function'
                ? valueTransform(name, rawValue)
                : rawValue;

        out[name] = transformed;
    }

    return out;
};

export const zodErrorsToMap = (err: any): Record<string, string> => {
    const out: Record<string, string> = {};
    if (!err) return out;

    const issues = err.issues ?? err.errors ?? [];

    for (const issue of issues) {
        // Some Zod versions use `.path`, others the issue shape uses `path`
        const pathArr = issue.path ?? issue?.schemaPath ?? [];
        const path = Array.isArray(pathArr)
            ? pathArr.join('.')
            : String(pathArr || '');
        const key = path || '_form';
        const message = issue.message ?? String(issue);

        if (!out[key]) out[key] = message;
        else out[key] = `${out[key]}; ${message}`; // join multiple messages
    }

    return out;
};

export const isZodSchema = (validator: any): validator is ZodSchema => {
    return validator && typeof validator.safeParseAsync === 'function';
};

export const getFormElement = (
    form: HTMLFormElement,
    name: string,
): FormElement | RadioNodeList | null => {
    const el = form.elements.namedItem(name) as any;
    return el || null;
};

export const setElementValue = (
    el: FormElement | RadioNodeList | null,
    value: any,
): void => {
    if (!el) return;

    if (el instanceof RadioNodeList) {
        const nodes = Array.from(el) as HTMLInputElement[];
        const strValue = String(value);
        nodes.forEach((n) => {
            n.checked = n.value === strValue;
        });
    } else if (el instanceof HTMLInputElement) {
        if (el.type === 'checkbox') {
            el.checked = !!value;
        } else {
            el.value = String(value ?? '');
        }
    } else if ('value' in el) {
        (el as any).value = String(value ?? '');
    }
};

export const getElementValue = (
    el: FormElement | RadioNodeList | null,
): any => {
    if (!el) return null;

    if (el instanceof RadioNodeList) {
        const nodes = Array.from(el) as HTMLInputElement[];
        const checked = nodes.find((n) => n.checked);
        return checked?.value ?? null;
    }

    if (el instanceof HTMLInputElement) {
        return el.type === 'checkbox' ? el.checked : el.value;
    }

    return (el as any).value ?? null;
};
