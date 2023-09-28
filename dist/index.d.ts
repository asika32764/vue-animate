type AttentionOptions = {
    duration?: number | string;
    delay?: number | string;
    iterationCount?: number | string;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
};
declare function attention(el: HTMLElement, animate: string, options?: AttentionOptions): Promise<void>;
declare function attention(el: HTMLElement, animate: string, duration: number | string | undefined, options?: AttentionOptions): Promise<void>;

declare function bounce(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function bounce(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function flash(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function flash(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function headShake(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function headShake(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function heartBeat(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function heartBeat(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function jello(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function jello(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function pulse(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function pulse(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function rubberBand(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function rubberBand(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function shakeX(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function shakeX(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function shakeY(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function shakeY(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function swing(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function swing(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function tada(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function tada(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

declare function wobble(el: HTMLElement, options?: AttentionOptions): Promise<void>;
declare function wobble(el: HTMLElement, duration?: number | string, options?: AttentionOptions): Promise<void>;

export { type AttentionOptions, attention, bounce, flash, headShake, heartBeat, jello, pulse, rubberBand, shakeX, shakeY, swing, tada, wobble };
