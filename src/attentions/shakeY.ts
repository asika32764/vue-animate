import { type AttentionOptions, doAttention } from '@/attention';

export function shakeY(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function shakeY(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function shakeY(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'shakeY', duration, options);
}