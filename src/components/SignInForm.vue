<script>
import FormInput from '@/components/FormInput.vue';
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    FormInput,
    BaseButton
  },
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password'
    }
  },
  methods: {
    sendForm() {
      console.log(`email: ${this.email}, password: ${this.password}`)
    },
    switchType() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  },
  computed: {
    isButtonDisabled() {
      const emailLength = this.email.length
      const passwordLength = this.password.length

      return !emailLength || !passwordLength;
    }
  }
}
</script>

<template>
  <div class="sign-in-form-wrapper">
    <form class="sign-in-form">
      <h2 class="sign-in-form__title">Sign In</h2>
      <FormInput
          class="sign-in-form__input"
          label="Email"
          name="email"
          valueInput="email"
          placeholder="Enter your email"
          v-model="email"
      />
      <FormInput
          class="sign-in-form__input"
          label="Password"
          name="password"
          valueInput="password"
          placeholder="Enter your password"
          v-model="password"
          :type="passwordFieldType"
          :password-field="true"
          @switch-type="switchType"
      >
      </FormInput>
      <BaseButton
          class="sign-in-form__button"
          text="Sign in"
          @click.prevent.stop="sendForm"
          :is-disabled="isButtonDisabled"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.sign-in-form-wrapper {
  padding: 2rem;
  margin: 0 auto;
  max-width: 480px;
  border: solid 1px rgba(0, 0, 0, .12);
  border-radius: 8px;
  flex-grow: 1;
}

.sign-in-form {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  &__title {
    text-align: center;
  }

  &__input {
    margin-top: 20px;
    width: 250px;
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
