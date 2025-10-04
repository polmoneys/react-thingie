import { forwardRef } from 'react';

import { clsx } from '../../../utils';
import type { PlayerProps } from '../interfaces';

import styles from './index.module.css';

const Player = forwardRef<HTMLVideoElement, PlayerProps>((props, ref) => {
    const {
        sources,
        preload = 'metadata',
        controls = false,
        playsInline = true,
        onLoad: onVideoLoaded,
        ratio = 'landscape',
        subtitles,
        // muted,
        // loop,
        ...options
    } = props;
    return (
        <video
            className={clsx(styles.video, styles[ratio])}
            ref={ref}
            preload={preload}
            controls={controls}
            playsInline={playsInline}
            onLoadedData={onVideoLoaded}
            {...options}
        >
            {Object.keys(sources).map((key) => (
                <source type={`video/${key}`} src={sources[key]} key={key} />
            ))}
            {/*
                <source media="(orientation: landscape)" src="sunset-landscape-1080.mp4">
                <source src="sunset-portrait-1080.mp4">
            */}
            {subtitles !== undefined && (
                <track
                    kind="subtitles"
                    src={`./${subtitles}`}
                    srcLang="en"
                    label="English"
                    default
                />
            )}
        </video>
    );
});

export default Player;
