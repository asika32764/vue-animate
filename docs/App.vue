<script setup lang="ts">
import animations from '@src/animations.json';
import { ref } from 'vue';

const lorem = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Duis vestibulum tincidunt turpis Etiam eget eleifend elit In et vestibulum ipsum Donec eu convallis urna Pellentesque sit amet accumsan leo Aliquam elementum justo turpis mollis maximus libero faucibus non Vivamus et eros libero';
let words = lorem.split(' ');

const effect = ref('fade');
const input = ref(words.shift());
const items = ref([
  'Sakura',
  'Sunflower',
  'Rose'
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

</script>

<template>
  <div class="container">
    <div class="text-center mt-5">
      <div>
        <a href="https://vuejs.org/" target="_blank">
          <img src="@/assets/vue.svg" class="logo vue" style="height: 175px" alt="Vue logo" />
        </a>
      </div>
      <div>
        <h1>Vue-Animate.css</h1>
      </div>
    </div>

    <div id="demo" class="row mt-5">
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

        <div class="code-sample">
                <pre class="p-3"><code>&lt;TransitionGroup name="{{ effect }}" tag=&quot;div&quot; class=&quot;list-group&quot;&gt;
    &lt;li v-for=&quot;item in items&quot; class=&quot;list-group-item&quot; :key=&quot;i&quot;&gt;<span v-pre>{{ item }}</span>&lt;/li&gt;
&lt;/TransitionGroup&gt;</code></pre>
        </div>
      </div>
      <div id="demo-component" class="col-md-7">
        <div class="text-toolbar d-flex gap-2">
          <div class="input-group">
            <input type="text" class="form-control" v-model="input" />
            <button type="button" class="btn btn-success" @click="addItem" style="width: 150px">Add</button>
          </div>

          <button type="button" class="btn btn-danger" @click="reset">Reset</button>
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
