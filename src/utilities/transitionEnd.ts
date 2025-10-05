import type { AnimationEvent, TransitionEvent } from 'react';

/*

<div
    style={{
        transition: 'opacity 300ms',
        opacity: show ? 1 : 0,
    }}
    onTransitionEnd={(e) => {
        // e.propertyName is typed; check to avoid multiple firings
        if (e.propertyName !== 'opacity') return;
        console.log('opacity transition finished');
    }}
>
    content
</div>


type MyButtonProps = {
  label: string;
} & TransitionEventsProps<HTMLButtonElement>;

export function MyButton({ label, onTransitionEnd, ...rest }: MyButtonProps) {
  return (
    <button
      {...rest}
      onTransitionEnd={onTransitionEnd}
    >
      {label}
    </button>
  );
}

*/

export type OnTransitionEndHandler<E extends HTMLElement = HTMLElement> = (
    event: TransitionEvent<E>,
) => void;

export type OnAnimationEndHandler<E extends HTMLElement = HTMLElement> = (
    event: AnimationEvent<E>,
) => void;

export interface TransitionEventsProps<E extends HTMLElement = HTMLElement> {
    onTransitionEnd?: OnTransitionEndHandler<E>;
    onAnimationEnd?: OnAnimationEndHandler<E>;
}
