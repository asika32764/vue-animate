import { type AttentionOptions, doAttention } from '@/attention';

export function rubberBand(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function rubberBand(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function rubberBand(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'rubberBand', duration, options);
}
