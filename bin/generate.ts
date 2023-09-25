import { readdirSync } from 'fs';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve, basename } from 'path';

type AnimationItem = {
  file: string;
  base: string;
  import: string;
  actions: string[]
};

const animations: { [action: string]: AnimationItem } = {};

run();

function run() {
  const animateDir = resolve('node_modules/animate.css/source');
  const dirs = readdirSync(animateDir, { withFileTypes: true });

  rmSync('src/css', { recursive: true, force: true });

  let indexContent = `
@import 'node_modules/animate.css/animate.css';
`;

  for (const dir of dirs) {
    if (!dir.isDirectory()) {
      continue;
    }

    if (dir.name === 'attention_seekers') {
      generateAttentions(dir.name);
      continue;
    }

    const typePath = resolve('node_modules/animate.css/source', dir.name);
    const files = readdirSync(typePath, { withFileTypes: true });

    for (const file of files) {
      if (!file.isDirectory()) {
        if (
          file.name === 'jackInTheBox.css'
          || file.name === 'hinge.css'
        ) {
          continue;
        }

        handleInOutTransition(typePath, file.name);
      }
    }
  }

  const animJson = {};

  for (const action in animations) {
    const animItem = animations[action];

    animJson[animItem.base] = animJson[animItem.base] || [];
    animJson[animItem.base].push(action);

    mkdirSync(dirname(animItem.file), { recursive: true });
    writeFileSync(animItem.file, animItem.actions.join("\n"));

    console.log('[Create CSS]', animItem.file);

    indexContent += `@import '${animItem.import}';\n`;
  }

  writeFileSync(resolve('src/animates/main.css'), indexContent);

  writeFileSync(resolve('src/animations.json'), JSON.stringify(animJson, null, 2));
}

function generateAttentions(dir: string) {
  const typePath = resolve('animate.css/source', dir);
  const files = readdirSync(typePath, { withFileTypes: true });
  const imports = [];

  for (const file of files) {
    if (!file.isDirectory()) {
      const animName = basename(file.name, '.css');

      imports.push(`export * from '@src/attentions/${animName}'`);

      const dest = resolve('src/attentions', animName + '.ts');
      const code = handleAttention(animName);

      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, code);

      console.log('[Create TS]', dest);
    }
  }

  writeFileSync(resolve('src/attentions/index.ts'), imports.join("\n"));
}

function handleAttention(animName: string) {
  return `import attention from '@src/attention';
  
export function ${animName}(el: HTMLElement) {
  return attention(el, '${animName}');
}  
`;
}

function handleInOutTransition(typePath: string, file: string) {
  let originCss = readFileSync(resolve(typePath, file), 'utf-8');

  const matches = originCss.matchAll(/@keyframes\s+(\w+)(In|Out)(\w*)|@keyframes\s+(\w+)/g);

  for (const match of matches) {
    let base: string = '',
      inOut: string = '',
      direction: string = '';

    if (match[4]) {
      base = match[4];
    } else {
      [, base, inOut, direction] = match;
    }

    saveToAnimations(base, inOut, direction);
  }
}

function saveToAnimations(base: string, inOut: string = '', direction: string = '') {
  const code = makeTransitionCss(base, inOut, direction) + "\n";

  const action = base + direction;

  const dest = resolve('src/animates', base, action + '.css');

  const animItem = animations[action]
    = animations[action] || { file: '', base: '', import: '', actions: [] };

  animItem.file = dest;
  animItem.base = base;
  animItem.import = './' + base + '/' + action + '.css';
  animItem.actions.push(code);
}

function makeTransitionCss(
  base: string,
  inOut: string,
  direction: string,
) {
  const enterLeave = inOut === 'In' ? 'enter' : 'leave';

  return `.${base}${direction}-${enterLeave}-active {
  animation-duration: var(--animate-duration);
  animation-fill-mode: both;
  animation-name: ${base}${inOut}${direction};
}`;
}

function makeTransitionTs(
  base: string,
  inOut: string,
  direction: string,
) {
  const enterLeave = inOut === 'In' ? 'enter' : 'leave';

  return `.${base}${direction}-${enterLeave}-active {
  animation-duration: var(--animate-duration);
  animation-fill-mode: both;
  animation-name: ${base}${inOut}${direction};
}`;
}
