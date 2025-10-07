<script>
import IconHide from '@/assets/icons/IconHide.vue';
import IconShow from '@/assets/icons/IconShow.vue';

export default {
    components: {
        IconHide,
        IconShow
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        passwordField: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: ''
        }
    },
    computed: {
        isErorr() {
            return !!this.errorMessage.length
        },
        rootClasses() {
            return {
                'form-input_password': this.passwordField,
                'js--error': this.isErorr
            }
        }
    }
}
</script>

<template>
    <div class="form-input" :class="rootClasses">
        <div class="form-input-wrapper">
            <label for="">{{ label }}</label>
            <input 
                :type="type"
                :id="name"
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value, name)"
            >
            <button 
                v-if="passwordField"
                @click.prevent.stop="$emit('switchType')"
            >
                <span class="icon-wrapper">
                    <IconHide v-if="type === 'password'"/>
                    <IconShow v-else/>
                </span>
            </button>
        </div>

        <span class="form-input__error"> {{ errorMessage }} </span>
    </div>

</template>


<style lang="scss" scoped>
.form-input {
    display: flex;
    flex-direction: column;
}

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

.form-input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
}

.form-input {
  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_password input {
    padding-right: 42px;
  }

  &_password button {
    position: absolute;
    bottom: 5px;
    right: 5px;
    padding: 8px;
    border-radius: 20px;
    /* color: var(--color-text-emphasis); */
  }

  &_password button:hover {
    background: rgba(192, 201, 216, .2);
  }

  &.js--error input {
    border-color: var(--colors-error);
  }

  &__error {
    margin-top: 4px;
    display: block;
    color: var(--colors-error);
    font-size: 12px;
    line-height: 16px;
  }
}

</style>