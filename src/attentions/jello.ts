import { type AttentionOptions, doAttention } from '@/attention';

export function jello(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function jello(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function jello(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'jello', duration, options);
}