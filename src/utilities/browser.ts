/*
  // URL: https://example.com/page?user=alice&age=30#ref=home
  uQuery('user'); // "alice"
  uQuery('age');  // "30"
  uQuery('ref');  // "home"   (from hash)
*/

export function queryURL(name: string) {
    const url = new URL(window.location.href);
    const qs = url.search || `?${url.hash.slice(1)}`;
    return new URLSearchParams(qs).get(name);
}

// 🔥 `/api/cities?country=${country}` VS.
// '/api/cities?' +
//   new URLSearchParams([
//     [ 'country', country ]
//   ])

export const openUrl = (to: string): unknown => window?.open(to, '_blank');

export const moveFocusTo = (selector: string) =>
    (document?.querySelector(selector) as HTMLElement)?.focus();

export default function isFocusVisible(element: Element): boolean {
    try {
        return element.matches(':focus-visible');
    } catch (error) {
        // Do not warn on jsdom tests, otherwise all tests that rely on focus have to be skipped
        // Tests that rely on `:focus-visible` will still have to be skipped in jsdom
        if (
            process.env.NODE_ENV !== 'production' &&
            !window.navigator.userAgent.includes('jsdom')
        ) {
            console.warn(
                [
                    ' The `:focus-visible` pseudo class is not supported in this browser.',
                ].join('\n'),
            );
        }
    }

    return false;
}

export const scrollToElement = (selector: string): void => {
    const el = document.querySelector(selector);
    if (el != null) {
        el.scrollIntoView();
    }
};

export const paintBody = (): void => {
    const body = document.querySelector('body');
    if (body !== null) {
        body.style.backgroundColor = `#${Math.floor(
            Math.random() * 16777215,
        ).toString(16)}`;
    }
};

export const clone = <T>(v: T): T => {
    if (typeof structuredClone === 'function') return structuredClone(v);
    return v;
};

export const isHoverableDevice = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)');

export const getInputTextSelection = (
    input: HTMLInputElement,
): { start: number; length: number } => {
    return {
        start: input.selectionStart ?? 0,
        length: (input.selectionEnd ?? 0) - (input.selectionStart ?? 0),
    };
};

interface DownloadOptions {
    filename?: string;
    content?: string | Blob;
    mimeType?: string;
    autoRevoke?: boolean;
}

export const onFileDownload = (options: DownloadOptions = {}): void => {
    const {
        filename = 'hello.txt',
        content = 'Hello, world!',
        mimeType = 'text/plain',
        autoRevoke = true,
    } = options;

    const blob: Blob =
        content instanceof Blob
            ? content
            : new Blob([content], { type: mimeType });

    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (autoRevoke) {
        URL.revokeObjectURL(link.href);
    }
};
