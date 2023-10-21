import { type AttentionOptions, doAttention } from '@/attention';

export function heartBeat(
  el: HTMLElement, options?: AttentionOptions,
): Promise<void>;

export function heartBeat(
  el: HTMLElement, duration?: number | string, options?: AttentionOptions,
): Promise<void>;

export function heartBeat(
  el: HTMLElement,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, 'heartBeat', duration, options);
}