import { type AttentionOptions, doAttention } from '@/attention';

export function bounce(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function bounce(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function bounce(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'bounce', duration, options);
}