import { type AttentionOptions, doAttention } from '@src/attention';

export function flash(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function flash(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function flash(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'flash', duration, options);
}