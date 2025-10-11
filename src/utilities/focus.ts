export const moveFocusTo = (selector: string) =>
    (document?.querySelector(selector) as HTMLElement)?.focus();
