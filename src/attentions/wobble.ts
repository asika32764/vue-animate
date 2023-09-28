import { type AttentionOptions, doAttention } from '@src/attention';

export function wobble(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function wobble(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function wobble(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'wobble', duration, options);
}