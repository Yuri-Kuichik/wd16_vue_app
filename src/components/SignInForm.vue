<script>
import FormInput from './FormInput.vue';

export default {
  components: {
    FormInput
  }, 
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      passwordMsgError: '',
      emailMsgErr: '',
      loading: false
    }
  },

  computed: {
    isFormCompleted() {
      const arr = [this.email, this.password]
      return arr.every( item => !!item.toString().length )
    }
  },

  methods: {
    switchVisibilityPassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    async login() {
      const data = {
        email: this.email,
        password: this.password,
      }

      console.log(data)
    }
  },
}
</script>

<template>
  <div class="sign-in-form-wrapper">
    <span class="sign-in-form__toggle" @click="$emit('toggle')">registration</span>
    <form class="sign-in-form">
      <h2>Sign In</h2>
      <FormInput 
        class="sign-in-form__input"
        v-model="email"
        label="Email"
        placeholder="Input your email"
        :error-message="emailMsgErr"
        name="email"
      />
      <FormInput 
        class="sign-in-form__input"
        v-model="password"
        label="Password"
        placeholder="Input your passowrd"
        password-field
        :type="passwordFieldType"
        @switch-type="switchVisibilityPassword"
        :error-message="passwordMsgError"
        name="password"
      />

      <BaseButton 
        class="sign-in-form__button"
        @click.prevent="login" 
        :is-disabled="!isFormCompleted" 
        :loading="loading"
      >
        <span>Send</span>
      </BaseButton>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .sign-in-form-wrapper {
    padding: 2rem;
    margin: 0 auto;
    max-width: 480px;
    border: solid 1px rgba(0,0,0,.12);
    border-radius: 8px;
    flex-grow: 1;
  }

  .sign-in-form {
    padding-top: 1rem;

    &__title {
      text-align: center;
    }

    &__input {
      margin-top: 20px;
    }

    &__button {
      margin-top: 32px;
      margin-bottom: 16px;
    }

    &__toggle {
      color: var(--color-primary);
      cursor: pointer;
    }
  }

</style>