import { type AttentionOptions, doAttention } from '@/attention';

export function headShake(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function headShake(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function headShake(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'headShake', duration, options);
}