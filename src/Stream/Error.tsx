import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';

export default function StreamError({
    show = false,
    error,
}: {
    show: boolean;
    error: string;
}) {
    if (!show) return null;
    return (
        <Alert mood="negative">
            <Font.Bold>Stream {error}</Font.Bold>
        </Alert>
    );
}
