<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Здесь могла быть ваша реклама.'
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <input
    :id="name"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
input {
  padding: 8px 12px;
  width: 100%;
  max-width: 100%;
  min-height: 32px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background: var(--color-white) !important;

  &::placeholder {
    color: rgba(0, 0, 0, .26);
  }

  &:focus-visible {
    border-color: rgb(253, 211, 42);
    /* border-color: var(--color-primary); */
  }
}
</style>
