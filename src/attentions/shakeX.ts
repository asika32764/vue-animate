import { type AttentionOptions, doAttention } from '@src/attention';

export function shakeX(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function shakeX(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function shakeX(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'shakeX', duration, options);
}