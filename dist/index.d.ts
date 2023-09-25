export * from '@src/attentions/bounce';
export * from '@src/attentions/flash';
export * from '@src/attentions/headShake';
export * from '@src/attentions/heartBeat';
export * from '@src/attentions/jello';
export * from '@src/attentions/pulse';
export * from '@src/attentions/rubberBand';
export * from '@src/attentions/shake';
export * from '@src/attentions/shakeX';
export * from '@src/attentions/shakeY';
export * from '@src/attentions/swing';
export * from '@src/attentions/tada';
export * from '@src/attentions/wobble';

declare function attention(el: HTMLElement, animate: string): Promise<void>;

declare namespace attention$1 {
  export { attention as default };
}

export { attention$1 as attention };
