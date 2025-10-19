import StreamAnswer from '../Smart-ish/Stream/Answer';
import StreamError from '../Smart-ish/Stream/Error';
import StreamHistory from '../Smart-ish/Stream/History';
import StreamPrompt from '../Smart-ish/Stream/Prompt';
import useStream from '../Smart-ish/Stream/useStream';

export default function DemoStream() {
    const { mutation, streamedText } = useStream();

    // const final = useMemo(()=>mutation.isSuccess ? mutation.data : [],[mutation]);

    return (
        <>
            <StreamPrompt />
            <StreamHistory />
            <StreamAnswer content={streamedText} />
            <StreamError
                show={mutation.isError}
                error={String(mutation.error?.message ?? 'Try again later')}
            />
            <br />
        </>
    );
}
