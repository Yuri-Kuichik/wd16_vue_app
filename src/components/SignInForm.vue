<script setup>
import FormInput from '@/components/FormInput.vue';
import BaseButton from "@/components/BaseButton.vue";
import { useAuthStore } from "@/stores/auth.js";
import { ref, computed } from 'vue';


const authStore = useAuthStore()
const email = ref('')
const password =ref('')
const passwordFieldType = ref('password')

const sendForm = () => {
  const userData = {
    email: email.value,
    password: password.value
  }
  authorizeUser(userData)
}

const authorizeUser = (userData) => {
  authStore.login(userData)
}

const switchType = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const isButtonDisabled = computed(() => {
  const emailLength = email.value.length
  const passwordLength = password.value.length

  return !emailLength || !passwordLength;
})

</script>

<template>
  <div class="sign-in-form-wrapper">
    <form class="sign-in-form">
      <h2 class="sign-in-form__title">Sign In</h2>

      <el-input
          class="new-sign-in-input"
          type="email"
          placeholder="Enter your email"
          name="email"
          v-model="email"
      />

      <el-input
          class="new-sign-in-input"
          type="password"
          placeholder="Enter your password"
          name="password"
          v-model="password"
          show-password
      />

      <el-button
        class="new-sign-in-button"
        type="warning"
        :disabled="isButtonDisabled"
        @click.prevent.stop="sendForm"
      >
        Sign In
      </el-button>
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

.new-sign-in-button, .new-sign-in-input {
  margin-top: 20px;
  width: 240px;
}

</style>
