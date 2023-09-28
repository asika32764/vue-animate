import { type AttentionOptions, doAttention } from '@/attention';

export function tada(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function tada(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function tada(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'tada', duration, options);
}
