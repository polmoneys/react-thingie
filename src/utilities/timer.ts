/*
  const sideEffect = new Timer(
    () => setAlertMessage("hola :) you have been 4s on page"),
      4000
  );
 */

export class Timer {
    timerId: ReturnType<typeof setTimeout> | null = null;
    start?: number;
    remaining: number;
    cb: () => void;

    constructor(cb: () => void, delay: number) {
        this.remaining = delay;
        this.cb = cb;
        this.resume();
    }

    resume = (): void => {
        this.start = Date.now();
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(this.cb, this.remaining);
    };

    clear = (): void => {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
    };

    pause = (): void => {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
        if (this.start !== undefined) {
            this.remaining -= Date.now() - this.start;
        }
    };
}
