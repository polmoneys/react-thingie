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
