<script>

export default {
  components: {
    BaseLayout
  },

  data() {
    return {
      counter: 0,
      doubleCounter: 0
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
    <section 
      class="counter-section" 
      @click="clickOnSection"
    >
      <div class="counter-wrapper">
        <h2 class="counter-title">Counter</h2>

        <div>
          <span class="counter-text">Value: {{ counter }}</span>
        </div>
        <div>
          <span class="counter-text">Double value: {{ doubleCounter }} </span>
        </div>

        <button 
          class="btn" @click="increment">
          Increment
        </button>
        <button class="btn" @click="decrement">
          Decrement
        </button>
        
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