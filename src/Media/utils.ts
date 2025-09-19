export const fallback = (
    width: number | string,
    height: number | string,
    fill: string,
): string =>
    `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect  fill='%23${fill}' width="${width}" height="${height}"/></svg>`;

export function isImgUrl(url: string) {
    return fetch(url, { method: 'HEAD' }).then((res) => {
        return res?.headers?.get('Content-Type')?.startsWith('image');
    });
}
