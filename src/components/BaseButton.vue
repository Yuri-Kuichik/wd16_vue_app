<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Click me'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'm'
    }
  },
  computed: {
    rootClasses() {
      return { 
        'is-disabled': this.isDisabled, 
        [`base-button_size--${this.size}`]: true 
      }
    }
  }
  
}
</script>

<template>
  <button 
    class="base-button" 
    :class="rootClasses" 
    :disabled="isDisabled"
  >
    <VueSpinner v-if="loading"/>
    <span v-else>
      <template v-if="$slots.default">
        <slot/>
      </template>
      <template v-else>
        {{ text }}
      </template>
    </span>
  </button>

</template>

<style lang=scss scoped>
.base-button {
  display: flex;
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
  width: 100%;
  max-width: 240px;

    &.is-disabled {
        // background: rgba(253, 211, 42, 0.5);
        opacity: 0.5;
        cursor: not-allowed;
      &:hover {
        opacity: 0.5;
      }
    }
}

.base-button:hover {
    opacity: 0.9;
}

.base-button_size--s {
    height: 36px;
}

.base-button_size--m {
    height: 42px;
}

.base-button_size--l {
    padding: 0 16px;
    height: 48px;
}


</style>