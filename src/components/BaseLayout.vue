<script>
import { h } from 'vue'

export default {
  // render() {
  //   return h(
  //     'section', // имя тега
  //     {class: 'base-layout'}, // входные параметры/атрибуты
  //     this.$slots.default() // массив дочерних элементов
  //   )
  // }
}
</script>

<template>
    <section class="base-layout">
        <slot></slot>
    </section>
</template>

<style scoped>
.base-layout  {
  width: 1280px;
  padding: 3rem 1rem;
  margin: 0 auto;
  max-width: 100%;
}
</style>