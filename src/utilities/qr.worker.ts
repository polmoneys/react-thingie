import * as Comlink from 'comlink';
import qrcodeFactory from 'qrcode-generator';

const api = {
    async generateSvg(text: string) {
        const qr = qrcodeFactory(0, 'M');
        qr.addData(String(text ?? ''));
        qr.make();

        const moduleCount = qr.getModuleCount();
        const cellSize = 6;
        const marginModules = 1;
        const size = moduleCount * cellSize + marginModules * 2 * cellSize;

        const parts: string[] = [];
        parts.push(`<?xml version="1.0" encoding="UTF-8"?>`);
        parts.push(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
        );
        parts.push(`<rect width="100%" height="100%" fill="#ffffff"/>`);

        for (let r = 0; r < moduleCount; r++) {
            for (let c = 0; c < moduleCount; c++) {
                if ((qr as any).isDark(r, c)) {
                    const x = (marginModules + c) * cellSize;
                    const y = (marginModules + r) * cellSize;
                    parts.push(
                        `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#000000"/>`,
                    );
                }
            }
        }

        parts.push('</svg>');
        return parts.join('');
    },

    async generateDataUrl(text: string) {
        // Build SVG synchronously
        const svg = await (api as any).generateSvg(text);

        // Convert SVG to PNG using OffscreenCanvas if available
        try {
            const blob = new Blob([svg], {
                type: 'image/svg+xml;charset=utf-8',
            });
            const bitmap = await createImageBitmap(blob);
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const ctx = canvas.getContext('2d');
            if (!ctx)
                throw new Error('OffscreenCanvas 2D context not available');
            ctx.drawImage(bitmap, 0, 0);
            const outBlob = await canvas.convertToBlob({ type: 'image/png' });
            const buffer = await outBlob.arrayBuffer();
            // convert to base64
            const bytes = new Uint8Array(buffer);
            let binary = '';
            const chunk = 0x8000;
            for (let i = 0; i < bytes.length; i += chunk) {
                binary += String.fromCharCode.apply(
                    null,
                    Array.from(bytes.subarray(i, i + chunk)) as any,
                );
            }
            return `data:image/png;base64,${btoa(binary)}`;
        } catch (e) {
            // Fallback: return SVG as data URL
            return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        }
    },
};

Comlink.expose(api);
export type QrWorkerAPI = typeof api;
