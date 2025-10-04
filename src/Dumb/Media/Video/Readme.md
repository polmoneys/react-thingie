```tsx
const mainVideoRef = useRef<HTMLVideoElement>(null);

const secondVideoRef = useRef<HTMLVideoElement>(null);
const handleMainVideoSeeked = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>,
): void => {
    const mainVideo = event.currentTarget;

    if (secondVideoRef.current != null) {
        secondVideoRef.current.currentTime = mainVideo.currentTime;
    }
};

<Player
        ratio="landscape"
        ref={mainVideoRef}
        sources={{
            mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        }}
        onSeeked={handleMainVideoSeeked}
        controls
/>

<Player
    ratio="portrait"
    ref={secondVideoRef}
    sources={{
        mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    }}
    controls
    preload="auto"
/>

```

```tsx
<VideoPlayer
    width="1300"
    height="730"
    sources={{
        // mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        // mp4: './end.mov',
        mp4: 'https://firebasestorage.googleapis.com/v0/b/polmoneys-731c9.appspot.com/o/TVRBO%20IS%20BORN.mp4?alt=media&token=11f01e6b-f072-4e8e-ab13-997e8552d70f',
    }}
    // subtitles="subtitles.vtt"
    // poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
    videoOptions={{
        controls: false,
        onLoad: () => {
            console.log('loaded');
        },
        onEnded: () => {
            console.log('end');
        },
        onSeeked: () => {
            console.log('seeked');
        },
        onSeeking: () => {
            console.log('seek-ing');
        },
        onWaiting: () => {
            console.log('wait-ing');
        },
    }}
>
    {({ onBlockMouseEnter, onBlockMouseLeave }) => {
        return (
            <Fragment>
                <Group
                    onMouseEnter={onBlockMouseEnter}
                    onMouseLeave={onBlockMouseLeave}
                    style={{
                        zIndex: 99999999999,
                        position: 'absolute',
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: 'pink',
                        top: '40%',
                        left: '50%',
                    }}
                />
            </Fragment>
        );
    }}
</VideoPlayer>
```
