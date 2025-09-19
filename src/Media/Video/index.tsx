import { useEffect, useRef, useState } from 'react';

import { clsx, has } from '../../utils';
import type { VideoPlayerProps } from '../interfaces';

import Controls from './Controls/Controller';
import Edge from './Controls/Edge';
import Player from './Player';

import styles from './index.module.css';

function VideoPlayer(props: VideoPlayerProps) {
    const {
        sources,
        videoOptions,
        width,
        height,
        title,
        subtitles,
        ratio = 'landscape',
        children,
        fitInParent,
    } = props;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isSeekingBackward, setIsSeekingBackward] = useState(false);
    const [isSeekingForward, setIsSeekingForward] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        const onTimeUpdate = (): void => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const currentTime = htmlVideo.currentTime;
        };

        htmlVideo.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            htmlVideo.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, []);

    useEffect(() => {
        let interval: number | undefined;

        const seekVideo = (direction: 'backward' | 'forward'): void => {
            if (videoRef.current == null) return;
            const seekSeconds = 5; // You can change this value to adjust the seeking interval
            const currentTime = videoRef.current.currentTime;
            const newTime =
                direction === 'backward'
                    ? currentTime - seekSeconds
                    : currentTime + seekSeconds;
            videoRef.current.currentTime = Math.max(
                0,
                Math.min(newTime, videoRef.current.duration),
            );
        };

        const intervalTime = 500; // 🙏🏾 magic number

        if (isSeekingBackward) {
            interval = window.setInterval(() => {
                seekVideo('backward');
            }, intervalTime);
        } else if (isSeekingForward) {
            interval = window.setInterval(() => {
                seekVideo('forward');
            }, intervalTime);
        } else {
            if (interval !== undefined) {
                window.clearInterval(interval);
            }
        }

        return () => {
            if (interval !== undefined) {
                window.clearInterval(interval);
            }
        };
    }, [isSeekingBackward, isSeekingForward]);

    const onLongPressStart = (direction: 'backward' | 'forward'): void => {
        return direction === 'backward'
            ? setIsSeekingBackward(true)
            : setIsSeekingForward(true);
    };

    const onLongPressEnd = (direction: 'backward' | 'forward'): void => {
        return direction === 'backward'
            ? setIsSeekingBackward(false)
            : setIsSeekingForward(false);
    };

    const onBlockMouseEnter = (): void => {
        if (videoRef.current != null && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const onBlockMouseLeave = (): void => {
        if (videoRef.current?.paused != null) {
            void videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const onKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'c' || event.key === 'C') {
            const videoEl = videoRef.current;
            if (videoEl == null) return;

            const track = videoEl.textTracks[0];
            track.mode = track.mode === 'hidden' ? 'showing' : 'hidden';
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        <div className={clsx(styles.root, fitInParent && styles.adapt)}>
            <Player
                ratio={ratio}
                sources={sources}
                {...videoOptions}
                ref={videoRef}
                width={width}
                height={height}
                subtitles={subtitles}
                {...(title !== undefined && {
                    'aria-label': title,
                })}
            />

            {isSeekingBackward && (
                <div aria-hidden="true" className={styles.edge} />
            )}
            <Edge
                position="start"
                onMouseDown={() => {
                    onLongPressStart('backward');
                }}
                onMouseUp={() => {
                    onLongPressEnd('backward');
                }}
                onTouchStart={() => {
                    onLongPressStart('backward');
                }}
                onTouchEnd={() => {
                    onLongPressEnd('backward');
                }}
            />
            <Edge
                position="end"
                onMouseDown={() => {
                    onLongPressStart('forward');
                }}
                onMouseUp={() => {
                    onLongPressEnd('forward');
                }}
                onTouchStart={() => {
                    onLongPressStart('forward');
                }}
                onTouchEnd={() => {
                    onLongPressEnd('forward');
                }}
            />
            {isSeekingForward && (
                <div
                    aria-hidden="true"
                    className={clsx(styles.edge, styles.end)}
                />
            )}

            <Controls
                videoRef={videoRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            {has(children)
                ? children({ onBlockMouseEnter, onBlockMouseLeave })
                : null}
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
const VideoIframe = (props: VideoPlayerProps) => (
    <iframe
        // "videoplayer.html"
        src={props.iframeUrl}
        title={props.title}
        loading="lazy"
        width={props.width}
        height={props.height}
    ></iframe>
);

// eslint-disable-next-line react-refresh/only-export-components
export default Object.assign(VideoPlayer, { VideoIframe });
