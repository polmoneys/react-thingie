import Font from '../Dumb/Font';
import Group from '../Dumb/Group';

export default function StreamError({
    show = false,
    error,
}: {
    show: boolean;
    error: string;
}) {
    if (!show) return null;
    return (
        <Group component={'div'}>
            <Font.Bold dangerousColor="var(--red)">Stream {error}</Font.Bold>
        </Group>
    );
}
