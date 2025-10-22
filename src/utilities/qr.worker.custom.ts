import * as Comlink from 'comlink';
import qrcodeFactory from 'qrcode-generator';

/*

// src/App.tsx
import React, { useMemo, useState, useRef } from 'react';
import * as Comlink from 'comlink';
import type { QrWorkerAPI, QROpts } from '../utilities/qr.worker.custom';

export default function App(): JSX.Element {
  const [errorCorrection, setErrorCorrection] = useState<QROpts['errorCorrection']>('M');
  const [typeNumber, setTypeNumber] = useState<number>(0);
  const [cellSize, setCellSize] = useState<number>(6);
  const [margin, setMargin] = useState<number>(1);
  const [fg, setFg] = useState<string>('#000000');
  const [bg, setBg] = useState<string>('#ffffff');
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoSizePx, setLogoSizePx] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleGenerate = async () => {
    setSvg(null);
    setError(null);
    setLoading(true);
    try {
      const opts: QROpts = {
        typeNumber,
        errorCorrection,
        cellSize,
        margin,
        foreground: fg,
        background: bg,
        logoDataUrl,
        logoSizePx,
      } as any;
      const res = await (api as any).generateSvg(text, opts);
      setSvg(res as string);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogoFile = (file?: File | null) => {
    if (!file) {
      setLogoDataUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setLogoDataUrl(dataUrl);
    };
    reader.onerror = () => {
      setError('Failed to read logo file');
    };
    reader.readAsDataURL(file);
  };

  return (
   <>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
        <label>
          Error correction
          <select value={errorCorrection} onChange={(e) => setErrorCorrection(e.target.value as any)} style={{ display: 'block', marginTop: 6 }}>
            <option value="L">L (low)</option>
            <option value="M">M (medium)</option>
            <option value="Q">Q (quartile)</option>
            <option value="H">H (high)</option>
          </select>
        </label>

        <label>
          Type number (0 = auto)
          <input type="number" value={typeNumber} min={0} max={40} onChange={(e) => setTypeNumber(Number(e.target.value))} style={{ display: 'block', marginTop: 6 }} />
        </label>

        <label>
          Cell size (px)
          <input type="number" value={cellSize} min={1} onChange={(e) => setCellSize(Number(e.target.value))} style={{ display: 'block', marginTop: 6 }} />
        </label>

        <label>
          Margin (modules)
          <input type="number" value={margin} min={0} onChange={(e) => setMargin(Number(e.target.value))} style={{ display: 'block', marginTop: 6 }} />
        </label>

        <label>
          Foreground color
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ display: 'block', marginTop: 6 }} />
        </label>

        <label>
          Background color
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ display: 'block', marginTop: 6 }} />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleLogoFile(e.target.files?.[0] ?? null)} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          Logo size (px)
          <input type="number" value={logoSizePx ?? ''} onChange={(e) => setLogoSizePx(e.target.value ? Number(e.target.value) : null)} style={{ width: 80 }} />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleGenerate} disabled={loading} style={{ padding: '8px 12px' }}>{loading ? 'Generating…' : 'Generate SVG'}</button>
        <button onClick={() => { setSvg(null); setError(null); setLogoDataUrl(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} style={{ padding: '8px 12px' }}>
          Reset
        </button>
      </div>

    </>
  );
}
*/

export type QROpts = {
    // 0 for automatic
    typeNumber?: TypeNumber;
    errorCorrection?: 'L' | 'M' | 'Q' | 'H';
    // pixels per module
    cellSize?: number;
    // modules of margin (quiet zone)
    margin?: number;
    // CSS color for dark modules
    foreground?: string;
    background?: string;
    // optional center logo as data URL (svg/png/jpg)
    logoDataUrl?: string | null;
    // pixel size for logo (square)
    logoSizePx?: number | null;
};

const DEFAULTS: Required<Omit<QROpts, 'logoDataUrl' | 'logoSizePx'>> = {
    typeNumber: 0,
    errorCorrection: 'M',
    cellSize: 6,
    margin: 1,
    foreground: '#000000',
    background: '#ffffff',
};

function escapeAttr(s: string) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;');
}

const api = {
    async generateSvg(text: string, opts?: QROpts) {
        const o: Required<Omit<QROpts, 'logoDataUrl' | 'logoSizePx'>> & {
            logoDataUrl?: string | null;
            logoSizePx?: number | null;
        } = {
            ...DEFAULTS,
            ...(opts ?? {}),
            logoDataUrl: opts?.logoDataUrl ?? null,
            logoSizePx: opts?.logoSizePx ?? null,
        } as any;

        const qr = qrcodeFactory(o.typeNumber, o.errorCorrection);
        qr.addData(String(text ?? ''));
        qr.make();

        const moduleCount = qr.getModuleCount();
        const cellSize = Math.max(1, Math.floor(o.cellSize));
        const marginModules = Math.max(0, Math.floor(o.margin));
        const size = moduleCount * cellSize + marginModules * 2 * cellSize;

        const parts: string[] = [];
        parts.push('<?xml version="1.0" encoding="UTF-8"?>');
        parts.push(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">`,
        );
        // background
        parts.push(
            `<rect width="100%" height="100%" fill="${escapeAttr(o.background)}"/>`,
        );

        // draw modules as rects
        // We group rects per row to keep smaller output (optional)
        for (let r = 0; r < moduleCount; r++) {
            let row = '';
            for (let c = 0; c < moduleCount; c++) {
                if ((qr as any).isDark(r, c)) {
                    const x = (marginModules + c) * cellSize;
                    const y = (marginModules + r) * cellSize;
                    row += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${escapeAttr(
                        o.foreground,
                    )}"/>`;
                }
            }
            if (row) parts.push(row);
        }

        // Optional centered logo (embedded as <image> inside the SVG)
        if (o.logoDataUrl) {
            try {
                const logoSize =
                    typeof o.logoSizePx === 'number' && o.logoSizePx > 0
                        ? o.logoSizePx
                        : Math.floor(size * 0.2);
                const logoX = Math.round((size - logoSize) / 2);
                const logoY = Math.round((size - logoSize) / 2);

                // Add a white rounded rectangle behind the logo to improve contrast
                const cornerR = Math.max(2, Math.round(logoSize * 0.06));
                parts.push(
                    `<rect x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" rx="${cornerR}" ry="${cornerR}" fill="${escapeAttr(
                        o.background,
                    )}" />`,
                );

                // Then the image
                parts.push(
                    `<image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet" href="${escapeAttr(
                        o.logoDataUrl,
                    )}" />`,
                );
            } catch (e) {
                // If embedding fails, ignore logo (worker should not throw for cosmetic failure)
            }
        }

        parts.push('</svg>');
        return parts.join('');
    },
};

Comlink.expose(api);
export type QrWorkerAPI = typeof api;
