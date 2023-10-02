# vue-animate

[![Version](https://img.shields.io/npm/v/@asika32764/vue-animate.svg?style=flat-square)](https://www.npmjs.com/package/vue2-animate)
[![License](https://img.shields.io/npm/l/@asika32764/vue-animate.svg?style=flat-square)](LICENSE)

Cross-browser CSS3 animation library, a port of animate.css for use with Vue.js transitions. [DEMO](https://vue-animate.simular.co/)

Support for:

- Vue 2.x
- Vue 3.x
- Alpine.js

## Credit

- [@haydenbbickerton](https://github.com/haydenbbickerton/vue-animate) is the original [vue-animate (LESS)](https://github.com/haydenbbickerton/vue-animate) author (Only for Vue 1.x).
- [@pavels-hyuna](https://github.com/pavels-hyuna) is v2 SCSS version author.

## Table of Contents

<!-- TOC -->
* [vue-animate](#vue-animate)
  * [Credit](#credit)
  * [Table of Contents](#table-of-contents)
  * [Installation](#installation)
  * [Transitions](#transitions)
    * [Custom Transition Classes](#custom-transition-classes)
    * [Custom Animation Properties](#custom-animation-properties)
    * [Slide as Mobile](#slide-as-mobile)
  * [Work with Alpine.js](#work-with-alpinejs)
  * [Attentions Seekers](#attentions-seekers)
  * [Options](#options)
  * [Contribution Guide](#contribution-guide)
    * [Build Lib](#build-lib)
    * [Build Docs](#build-docs)
    * [Sync from animate.css](#sync-from-animatecss)
<!-- TOC -->

## Installation

```shell
npm i @asika32764/vue-animate --save

yarn add @asika32764/vue-animate
```

## Transitions

Import full animations.

```ts
import '@asika32764/vue-animate/dist/vue-animate.css';
```

Use [Vue.js transitions](https://vuejs.org/guide/built-ins/transition.html "Vue.js Transitions") as you normally would, but for the transition name you will use one of [Animate.css animations](https://animate.style/#utilities "animations") **removing** the `animate__` and `in/Out` from the name.

For example, if you want to use `animate__animated animate__fadeInLeft` and `animate__fadeInLeft` on your element, You could write:

```html
<TransitionGroup name="fadeLeft" tag="ul">
    <li v-for="item in items" :key="item.id">
        {{ item }}
    </li>
</TransitionGroup>
```
enter/leave is already written in the stylesheet, so just remove `In/Out` from the name and you're golden.

### Custom Transition Classes

Animate.css's original classnames are supported on enter/leave transitions. So if you're going to use [Custom Transition Classes](https://vuejs.org/guide/built-ins/transition.html#css-based-transitions "Custom Transition Classes"), you can either add *-enter/-leave* to the classes:

```html
<Transition
  name="custom-classes-transition"
  enter-active-class="bounceLeft-enter"
  leave-active-class="bounceRight-leave"
>
  <p v-if="show">hello</p>
</Transition>
```
Or use the regular *In/Out* syntax:

```html
<Transition
  name="bounce"
  enter-active-class="bounceInLeft"
  leave-active-class="bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

### Custom Animation Properties

```html
<Transition name="fade">
  <p v-if="show" 
    style="--animate-duration: 0.3s; --animate-delay: 150; --animate-direction: reverse;"
  >hello</p>
</Transition>
```

### Slide as Mobile

The view element must set position as absolute.

```
<Transition
    enter-active-class="position-absolute slideInRight"
    leave-active-class="position-absolute slideOutLeft">
    <router-view :key="path"></router-view>
</transition>
```

## Work with Alpine.js

Alpine `x-transition` must add `enter` and `leave` suffix, you have to add `In` and `Out` suffix after animation name.

```html
<div x-show="open"
    x-transition:enter="fadeIn"
    x-transition:leave="fadeOut"
    style="animation-duration: .3s"
>...</div>
```

See also: https://github.com/alpinejs/alpine#x-transition

## Attentions Seekers

To use Attentions, vue-animate.css provides a set of JS functions.

```ts
import { bounce } from '@asika32764/vue-animate';
import { ref } from 'vue';

const el = ref<HTMLElement>();

bounce(el.value);
```

- [DEMO](https://vue-animate.simular.co/#attentions)
- [Available Attentions Seekers](https://github.com/asika32764/vue-animate.css/tree/main/src/attentions)

## Options

You could add animation properties to following parameters.

```ts
bounce(el.value, 300); // Durations 300ms
bounce(el.value, '.3s'); // Durations 0.3seconds
bounce(el.value, 300, { delay: 200 }); // Add duration and delay
bounce(el.value, { duration: 300, delay: 200 }); // Add duration and delay by options object
```

| Option         | Type                                               | Description                          |
|----------------|----------------------------------------------------|--------------------------------------|
| duration       | string, number                                     | Can be any CSS valid duration value. |
| delay          | string, number                                     | Can be any CSS valid duration value. |
| iterationCount | string, number                                     | The number of times to play.         |
| direction      | `normal` `reverse` `alternate` `alternate-reverse` | The animation playing direction.     |
| fillMode       | `none` `forwards` `backwards` `both`               | The animation fill mode.             |

## Contribution Guide

Clone project and install deps.

```shell
git clone git@github.com:asika32764/vue-animate.git
cd vue-animate
yarn install
```

Run:

```shell
yarn dev
```

Will launch a Vite dev server of the documentation site which the source file at `src/docs`.
You can modify this site to test your code. (Do not push you test code.)

### Build Lib

Run this command to build `/dist` files.

```shell
rollup -c
```

### Build Docs

Run this command to build `/docs` files.

```shell
yarn build:docs
```

### Sync from animate.css

This project is auto convert from animate.css animations, if animate.css release new animations, 
you can run this command to sync animations and auto generate source files.

```shell
yarn generate
```
