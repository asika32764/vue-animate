import { type AttentionOptions, doAttention } from '@/attention';

export function pulse(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function pulse(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function pulse(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'pulse', duration, options);
}
