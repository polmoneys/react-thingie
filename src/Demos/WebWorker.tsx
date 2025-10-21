import { useEffect, useMemo, useState } from 'react';

import * as Comlink from 'comlink';

import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import TextInputLabel from '../Dumb/InputText';
import ToolBar from '../Dumb/Toolbar';
import type { QrWorkerAPI } from '../utilities/qr.worker';

export default function DemoWebWorker() {
    const worker = useMemo(
        () =>
            new Worker(new URL('../utilities/qr.worker.ts', import.meta.url), {
                type: 'module',
            }),
        [],
    );

    const [text, setText] = useState('https://polmoneys.com');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [terminated, setTerminated] = useState(false);

    const api = useMemo(() => Comlink.wrap<QrWorkerAPI>(worker), [worker]);

    useEffect(() => {
        return () => {
            try {
                if (!import.meta.env.DEV) {
                    console.log('Dev mode');
                    worker.terminate();
                    setTerminated(true);
                }
            } catch (e) {
                //
            }
        };
    }, [worker]);

    const generateSvg = async () => {
        setResult(null);
        setError(null);
        setLoading(true);
        try {
            const svg = await (api as any).generateSvg(text);
            setResult(svg);
        } catch (err: any) {
            setError(err?.message ?? String(err));
        } finally {
            setLoading(false);
        }
    };

    const generateDataUrl = async () => {
        setResult(null);
        setError(null);
        setLoading(true);
        try {
            const dataUrl = await (api as any).generateDataUrl(text);
            setResult(dataUrl);
        } catch (err: any) {
            setError(err?.message ?? String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TextInputLabel
                id="qr-input"
                label={<Icon.Info size={32} />}
                value={text}
                onChange={(v) => setText(v)}
                gridTemplateColumns="44px 1fr"
            />

            <br />
            <ToolBar label="Actions" dangerous={{ gap: 'var(--gap-1)' }}>
                <Button.Positive
                    isPending={loading}
                    {...(!loading && { start: <Icon.Add size={22} /> })}
                    onClick={generateSvg}
                >
                    {loading ? 'Generating…' : 'SVG'}
                </Button.Positive>
                <Button.Positive
                    isPending={loading}
                    {...(!loading && { start: <Icon.Add size={22} /> })}
                    onClick={generateDataUrl}
                >
                    {loading ? 'Generating…' : 'PNG DataURL'}
                </Button.Positive>

                <Button.Negative
                    start={<Icon.X size={22} />}
                    onClick={() => {
                        worker.terminate();
                        setTerminated(true);
                    }}
                >
                    Terminate worker
                </Button.Negative>
            </ToolBar>
            <br />

            <Group.Col
                className="theme info"
                dangerous={{
                    minHeight: '200px',
                    placeContent: 'center',
                    placeItems: 'center',
                }}
            >
                {loading && <Icon.LoadingBar />}
                {!loading &&
                    result &&
                    (result.startsWith('data:') ? (
                        <img src={result} alt="QR" />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: result }} />
                    ))}
                {!loading && !result && !error && (
                    <Font.Bold>No QR generated yet.</Font.Bold>
                )}
            </Group.Col>

            <br />
            {error && (
                <Alert mood="negative">
                    <Font.Bold>Error:</Font.Bold> <Font>{error}</Font>
                </Alert>
            )}
            <br />

            <Alert mood={terminated ? 'negative' : 'info'}>
                <Font.Bold>
                    Worker status: {terminated ? 'OFF' : 'ON'}
                </Font.Bold>
            </Alert>
        </>
    );
}
