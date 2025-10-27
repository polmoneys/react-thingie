import { lazy, Suspense } from 'react';

import Alert from '../Dumb/Alert';
import IconLoadingBar from '../Dumb/Icon/Icons/LoadingBar';
import Qr from '../Inspired/Embed/Qr';

function QRCodeGeneratorFallback() {
    return (
        <Alert fitContent>
            <IconLoadingBar />
        </Alert>
    );
}
const LazyQRCodeGenerator = lazy(() =>
    Promise.resolve({
        default: Qr,
    }),
);

export default function EmbedsDemo() {
    return (
        <>
            <Suspense fallback={<QRCodeGeneratorFallback />}>
                <LazyQRCodeGenerator />
            </Suspense>
            <br />
        </>
    );
}
