<script setup lang="ts">
import animations from '@src/animations.json';
import attentions from '@src/attentions.json';
import * as attentionFunctions from '@src/attentions/index';
import { computed, ref } from 'vue';

const lorem = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Duis vestibulum tincidunt turpis Etiam eget eleifend elit In et vestibulum ipsum Donec eu convallis urna Pellentesque sit amet accumsan leo Aliquam elementum justo turpis mollis maximus libero faucibus non Vivamus et eros libero';
let words = lorem.split(' ');

const effect = ref('fade');
const input = ref(words.shift());
const items = ref([
  'Sakura',
  'Sunflower',
  'Rose',
]);

function addItem() {
  if (!input.value) {
    return;
  }

  items.value.unshift(input.value);
  input.value = words.shift() || '';

  if (!words.length) {
    words = lorem.split(' ');
  }
}

function reset() {
  items.value = [];
}

// Attentions
const attentionTitle = ref<HTMLHeadingElement>();
const attentionEffect = ref('bounce');
const duration = ref('');
const delay = ref('');
const attentionRunning = ref(false);
const sampleAttentionArguments = computed(() => {
  if (duration.value === '' && delay.value === '') {
    return '';
  }
  const options = [];

  if (duration.value !== '') {
    let value = isNumeric(duration.value) ? duration.value : `'${duration.value}'`;
    options.push(`duration: ${value}`);
  }

  if (delay.value !== '') {
    let value = isNumeric(delay.value) ? delay.value : `'${delay.value}'`;
    options.push(`delay: ${value}`);
  }

  if (options.length === 0) {
    return '';
  }

  return ', { ' + options.join(', ') + ' }';
});
const attentionsSampleCode = computed(() => `import { ${attentionEffect.value} } from 'vue-animate.css';

const el = ref<HTMLElement>();

${attentionEffect.value}(el.value!${sampleAttentionArguments.value});
`);

// @see https://stackoverflow.com/a/175787/8134785
function isNumeric(str: string): boolean {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

async function doAttention(name: keyof typeof attentionFunctions) {
  attentionEffect.value = name;

  attentionRunning.value = true;

  await attentionFunctions[name](attentionTitle.value!, { duration: duration.value, delay: delay.value });

  attentionRunning.value = false;
}

</script>

<template>
  <div class="container pb-5">
    <div class="text-center mt-5">
      <div>
        <a href="https://vuejs.org/" target="_blank">
          <img src="@/assets/vue.svg" class="logo vue" style="height: 175px" alt="Vue logo" />
        </a>
      </div>
      <div>
        <h1 class="mb-3">Vue-Animate.css</h1>

        <p class="lead">A Vue.js port of Animate.css. For use with Vue's built-in transitions</p>
      </div>

      <div class="mt-5 d-flex justify-content-center gap-3">
        <a href="https://github.com/asika32764/vue-animate.css" target="_blank"
            class="btn btn-light px-4">
          <i class="fab fa-github"></i>
          GitHub
        </a>
        <a href="https://github.com/asika32764/vue-animate.css" target="_blank"
            class="btn btn-light px-4">
          <i class="fab fa-npm"></i>
          NPM
        </a>
        <a href="https://github.com/asika32764/vue-animate.css#readme" target="_blank"
            class="btn btn-light px-4">
          <i class="fa fa-book"></i>
          Documentation
        </a>
        <a href="https://github.com/asika32764/vue-animate.css#readme" target="_blank"
            class="btn btn-light px-4">
          <i class="fa fa-scale-balanced"></i>
          MIT License
        </a>
      </div>
    </div>

    <section id="transition-demo" class="" style="margin-top: 85px">
      <header class="text-center mb-5">
        <h2 class="display-5">Transitions</h2>
      </header>

      <div class="row">
        <div class="col-md-5">
          <h3 style="margin-top: 0; margin-bottom: .7em">Select an effect to DEMO</h3>
          <div class="form-group">
            <select name="effect" v-model="effect" class="form-select">
              <template v-for="(effects, group) of animations">
                <optgroup :label="group as string">
                  <option :value="effect" v-for="effect of effects">
                    {{ effect }}
                  </option>
                </optgroup>
              </template>
            </select>
          </div>

          <div class="code-sample mt-4">
          <pre class="p-3 rounded"
              style="background-color: var(--bs-gray-800)"
          ><code>&lt;TransitionGroup name="{{ effect }}" tag=&quot;div&quot; class=&quot;list-group&quot;&gt;
  &lt;li v-for=&quot;item of items&quot; class=&quot;list-group-item&quot; :key=&quot;item&quot;&gt;
    <span v-pre>{{ item }}</span>
  &lt;/li&gt;
&lt;/TransitionGroup&gt;</code></pre>
          </div>
        </div>
        <div id="demo-component" class="col-md-7">
          <div class="text-toolbar d-flex gap-2">
            <div class="input-group">
              <input type="text" class="form-control" v-model="input" />
              <button type="button" class="btn btn-success text-nowrap" @click="addItem"
                  style="width: 150px">
                <i class="fa fa-plus"></i>
                Add
              </button>
            </div>

            <button type="button" class="btn btn-danger text-nowrap" @click="reset">
              <i class="fa fa-trash"></i>
              Reset
            </button>
          </div>

          <div class="list-box" style="margin-top: 30px">
            <TransitionGroup :name="effect" tag="div" class="list-group">
              <div v-for="item in items" class="list-group-item" :key="item">
                {{ item }}
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </section>

    <!--  Attentions DEMO  -->
    <section id="attentions-demo" style="margin-top: 75px">
      <header class="text-center mb-5">
        <h2 class="display-5" ref="attentionTitle">Attentions</h2>

        <p class="mt-3">Click a button to demo the animations.</p>
      </header>

      <div class="">
        <div class="d-flex justify-content-center gap-3 mb-4">
          <button class="btn btn-outline-light" v-for="attention of attentions"
              @click="doAttention(attention as keyof typeof attentionFunctions)"
              :class="{ active: attentionEffect === attention && attentionRunning }"
          >
            {{ attention }}
          </button>
        </div>

        <div class="d-flex justify-content-center gap-5">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="input-duration" v-model="duration"
                placeholder="Can be '2s' or 2000">
            <label for="input-duration">Duration</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="input-delay" v-model="delay"
                placeholder="Can be '2s' or 2000">
            <label for="input-delay">Delay</label>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div class="code-sample mx-auto" style="max-width: 600px">
          <pre class="p-3 rounded"
              style="background-color: var(--bs-gray-800)"
          ><code>{{ attentionsSampleCode }}</code></pre>
        </div>
      </div>
    </section>

    <footer class="" style="margin-top: 85px">
      <div class="container text-center">
        Made with <i class="fa fa-heart text-danger"></i> by <a class="link-light" href="https://simular.co">SIMULAR</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
