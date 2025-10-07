<script>
export default {
  data() {
    return {
      counter: 0
    }
  },

  methods: {
    increment() {
      this.counter++
    },

    decrement() {
      this.counter--
    }
  },

  computed: {
    doubleCounter() {
      return this.counter * 2
    }
  }
}
</script>

<template>
  <BaseLayout>
    <section class="counter-section">
      <div class="counter-wrapper">

        <div>
          <span class="counter-text">Value: {{ counter }}</span>
        </div>
        <div>
          <span class="counter-text">Double value: {{ doubleCounter }} </span>
        </div>

        <div class="d-flex">
          <BaseButton text="Increment" @click="increment" />
          <BaseButton text="Decrement" @click="decrement" />
        </div>
       
      </div>
    </section>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.counter-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter-wrapper {
  margin: auto;
  max-width: 250px;
  text-align: center;
}

.counter-buttons-wrapper {
  display: flex;
  column-gap: 25px;
  padding: 20px;
}

button {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background: rgb(253, 211, 42);
  color: rgb(7, 7, 7);
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  height: 48px;
  min-width: 48px;
  max-width: 100%;

  &.disabled {
    cursor: cell;
    background: rgba(253, 211, 42, 0.5);
  }

  &:not(:last-child) {
    margin-right: 4px;
  }
}

input {
  padding: 8px 12px;
  width: 100%;
  min-height: 32px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  background: var(--color-white) !important;
  margin-bottom: 12px;
  max-width: 240px;

  &::placeholder {
    color: rgba(0, 0, 0, .26);
  }

  &:focus-visible {
    border-color: rgb(253, 211, 42);
  }
}
</style>