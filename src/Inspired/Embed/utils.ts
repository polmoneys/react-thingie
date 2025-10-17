type AllowlistEntry = string; // e.g. "example.com" or "*.trusted.com"

/*
try {
  const res = validateQrUrlClient(scannedValue, ["example.com", "*.trusted.com"]);
  // res.status === 200 -> OK
} catch (err) {
  // reject / show warning
}

*/
export function isAllowedHostname(
    // /react-thingie/
    hostname: string = 'polmoneys.github.io',
    allowlist: AllowlistEntry[],
): boolean {
    hostname = hostname.toLowerCase();
    for (const pattern of allowlist) {
        const p = pattern.toLowerCase();
        if (p.startsWith('*.')) {
            const base = p.slice(2); // e.g. "trusted.com"
            if (hostname === base || hostname.endsWith('.' + base)) return true;
        } else {
            if (hostname === p) return true;
        }
    }
    return false;
}

export function validateQrUrlClient(
    qr: string,
    allowlist: AllowlistEntry[],
    allowedSchemes = ['https:'],
): { ok: true; status: 200; url: string } {
    let url: URL;
    try {
        url = new URL(qr);
    } catch (err) {
        throw new Error('Invalid URL');
    }

    if (!allowedSchemes.includes(url.protocol)) {
        throw new Error(`Protocol ${url.protocol} not allowed`);
    }

    const host = url.hostname;
    const ipV4Or6 = /^(?:\d{1,3}\.){3}\d{1,3}$|^\[?[0-9a-fA-F:]+\]?$/;
    if (ipV4Or6.test(host)) {
        throw new Error('IP literals are not allowed');
    }

    if (!isAllowedHostname(host, allowlist)) {
        throw new Error('Hostname not in allowlist');
    }

    return { ok: true, status: 200, url: url.toString() };
}
