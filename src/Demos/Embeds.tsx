import { lazy, Suspense } from 'react';

import Alert from '../Dumb/Alert';
import Icon from '../Dumb/Icon';
import Qr from '../Inspired/Embed/Qr';

function QRCodeGeneratorFallback() {
    return (
        <Alert fitContent>
            <Icon.LoadingBar />
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
        <Suspense fallback={<QRCodeGeneratorFallback />}>
            <LazyQRCodeGenerator />
        </Suspense>
    );
}
