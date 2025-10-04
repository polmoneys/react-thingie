import type {
    DetailedHTMLProps,
    ReactElement,
    VideoHTMLAttributes,
} from 'react';

export interface RenderProp<TChildrenProps, TElement = unknown> {
    (props: TChildrenProps): ReactElement<TElement>;
}

interface AspectRatio {
    ratio?: 'portrait' | 'landscape';
}
export interface MediaProps extends AspectRatio {
    alt: string;
    src: string;
    height?: string;
    sources?: Record<string, string>;
    eager?: boolean;
    objectPosition?: string;
    priority?: 'low' | 'high';
}

export interface PlayerProps
    extends DetailedHTMLProps<
            VideoHTMLAttributes<HTMLVideoElement>,
            HTMLVideoElement
        >,
        AspectRatio {
    sources: Record<string, string>;
    onSeeked?: VideoHTMLAttributes<HTMLVideoElement>['onSeeked'];
    subtitles?: string;
}

export interface VideoPlayerProps extends AspectRatio {
    fitInParent?: boolean;
    sources: Record<string, string>;
    videoOptions?: DetailedHTMLProps<
        VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
    >;
    width: string;
    height: string;
    subtitles?: string;
    title?: string;
    iframeUrl?: string;
    children?: RenderProp<{
        onBlockMouseEnter: () => void;
        onBlockMouseLeave: () => void;
    }>;
}
