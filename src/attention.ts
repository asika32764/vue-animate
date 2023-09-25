
export default function attention(el: HTMLElement, animate: string) {
  return new Promise<void>((resolve) => {
    el.addEventListener('animationend', () => {
      el.classList.remove(animate);
      resolve();
    }, { once: true });

    el.classList.add(animate);
  });
}
