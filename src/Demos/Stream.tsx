import StreamAnswer from '../Stream/Answer';
import StreamError from '../Stream/Error';
import StreamHistory from '../Stream/History';
import StreamPrompt from '../Stream/Prompt';
import useStream from '../Stream/useStream';

export default function DemoStream() {
    const { mutation, streamedText } = useStream();

    // const final = useMemo(()=>mutation.isSuccess ? mutation.data : [],[mutation]);

    return (
        <>
            {/*<Icon.Loading /> */}
            <StreamPrompt />

            <StreamHistory />
            <StreamAnswer content={streamedText} />
            <StreamError
                show={mutation.isError}
                error={String(mutation.error?.message ?? 'Try again later')}
            />
        </>
    );
}
