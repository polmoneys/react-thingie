import {
    cloneElement,
    type ComponentProps,
    type Dispatch,
    Fragment,
    isValidElement,
    type ReactElement,
    type RefObject,
    type SetStateAction,
    useState,
} from 'react';

import { clsx } from '../../../utils';

import Range from './Range';

import styles from '../index.module.css';

interface ControlsProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    randomPlay?: ReactElement<ComponentProps<'button'>>;
    mute?: ReactElement<{
        isMuted: boolean;
        onClick: () => void;
    }>;
}

export default function Controls(props: ControlsProps) {
    const { videoRef, isPlaying, setIsPlaying, randomPlay, mute } = props;
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const onTogglePlay = (): void => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        if (htmlVideo.paused) {
            void htmlVideo.play();
            setIsPlaying(true);
        } else {
            htmlVideo.pause();
            setIsPlaying(false);
        }
    };

    const onVolumeChangeRange = (number: number): void => {
        setVolume(number);
        if (videoRef.current != null) {
            videoRef.current.volume = number;
        }
    };

    const onPlayRandom = (): void => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        const randomTime = Math.random() * htmlVideo.duration;
        htmlVideo.currentTime = randomTime;
        void htmlVideo.play();
        setIsPlaying(true);
    };

    const onToggleMute = (): void => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        htmlVideo.muted = !htmlVideo.muted;
        setIsMuted(htmlVideo.muted);
    };

    if (videoRef.current === null) return null;
    return (
        <Fragment>
            <div className={styles.controls}>
                <button
                    className={clsx(isPlaying ? styles.playing : styles.paused)}
                    onClick={onTogglePlay}
                >
                    <span className={styles.offscreen}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </span>
                </button>
                <Range
                    min="0"
                    max="1"
                    step="0.01"
                    initial={volume}
                    onChangeValue={onVolumeChangeRange}
                />
            </div>
            <div className={styles.extraControls}>
                {randomPlay != null &&
                    isValidElement(randomPlay) &&
                    cloneElement(randomPlay, { onClick: onPlayRandom })}
                {mute != null &&
                    isValidElement(mute) &&
                    cloneElement(mute, {
                        onClick: onToggleMute,
                        isMuted,
                    })}
            </div>
        </Fragment>
    );
}
