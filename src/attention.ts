export type AttentionOptions = {
  duration?: number | string;
  delay?: number | string;
  iterationCount?: number | string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
};

export default function attention(
  el: HTMLElement,
  animate: string,
  options?: AttentionOptions,
): Promise<void>;

export default function attention(
  el: HTMLElement,
  animate: string,
  duration: number | string | undefined,
  options?: AttentionOptions,
): Promise<void>;

export default function attention(
  el: HTMLElement,
  animate: string,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  return doAttention(el, animate, duration, options);
}

export function doAttention(
  el: HTMLElement,
  animate: string,
  duration: AttentionOptions | number | string | undefined = undefined,
  options: AttentionOptions = {},
): Promise<void> {
  if (typeof duration === 'number' || typeof duration === 'string') {
    options.duration = duration;
  } else if (duration != undefined) {
    options = duration;
  }

  return new Promise<void>((resolve) => {
    const rollbacks = getRollbacks(el);

    el.addEventListener('animationend', () => {
      el.classList.remove('animate__animated', 'animate__' + animate);

      restore(el, rollbacks);
      resolve();
    }, { once: true });

    setVariables(el, options);

    el.classList.add('animate__animated', 'animate__' + animate);
  });
}

function setVariables(el: HTMLElement, options: AttentionOptions) {
  if (options.duration) {
    el.style.setProperty('animation-duration', String(options.duration));
  }

  if (options.delay) {
    el.style.setProperty('animation-delay', String(options.delay));
  }

  if (options.iterationCount) {
    el.style.setProperty('animation-iteration-count', String(options.iterationCount));
  }

  if (options.direction) {
    el.style.setProperty('animation-direction', options.direction);
  }

  if (options.fillMode) {
    el.style.setProperty('animation-fill-mode', options.fillMode);
  }
}

function restore(el: HTMLElement, rollbacks: { [name: string]: string }) {
  for (const varName in rollbacks) {
    const value = rollbacks[varName];

    if (value === '') {
      el.style.removeProperty(varName);
    } else {
      el.style.setProperty(varName, value);
    }
  }
}

function getRollbacks(el: HTMLElement) {
  const rollbacks: { [name: string]: string } = {};

  rollbacks['animation-duration'] = el.style.getPropertyValue('animation-duration');
  rollbacks['animation-delay'] = el.style.getPropertyValue('animation-delay');
  rollbacks['animation-iteration-count'] = el.style.getPropertyValue('animation-iteration-count');
  rollbacks['animation-direction'] = el.style.getPropertyValue('animation-direction');
  rollbacks['animation-fill-mode'] = el.style.getPropertyValue('animation-fill-mode');

  return rollbacks;
}
