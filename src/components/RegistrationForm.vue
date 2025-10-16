<script>
import { useAuthStore } from '@/stores/auth';
import FormInput from './FormInput.vue';

export default {
    setup() {
        const authStore = useAuthStore();   
        return {
            authStore
        }
    },

    components: {
        FormInput
    },

    data() {
        return {
            username: '',
            password: '',
            email: '',
            course_group: 15,
            activateUrl: '',
            nameMsgError: '',
            emailMsgError: '',
            passwordMsgError: '',
            loading: false,
            passwordFieldType: 'password',
            isShowActivateForm: false,
        }
    },

    computed: {
        isFormCompleted() {
            return this.username && this.password && this.email
        }
    },

    methods: {
        switchVisibilityPassword() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },

        async registration() {
            const formData = {
                username: this.username,
                password: this.password,
                email: this.email,
                course_group: this.course_group
            }
            await this.authStore.registration(formData)
        },

        showActivateForm() {
            this.isShowActivateForm = true
        },

        activateUser() {
            this.authStore.activateUser(this.getDataUserFromUrl())
        },

        getDataUserFromUrl() {
            const str = this.activateUrl.split('activate/')[1]

            const uid = str?.split('/')[0]
            const token = str?.split('/')[1]

            return {
                uid,
                token
            }
        }
    }
}
</script>

<template>
  <div class="registration-form-wrapper">
    <span class="registration-form__toggle" @click="$emit('toggle')">sign in</span>
    <form v-if="!isShowActivateForm" class="registration-form">
      <h2>Registration</h2>
      <FormInput 
        class="registration-form__input"
        v-model="username"
        label="Name"
        placeholder="Input your name"
        :error-message="nameMsgError"
        name="email"
      />
      <FormInput 
        class="registration-form__input"
        v-model="email"
        label="Email"
        placeholder="Input your email"
        :error-message="emailMsgError"
        name="email"
      />
      <FormInput 
        class="registration-form__input"
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
        class="registration-form__button"
        @click.prevent="registration" 
        :is-disabled="!isFormCompleted" 
        :loading="loading"
      >
        <span>Send</span>
      </BaseButton>

      <p>
        After successful registration click <b>Activate</b> button 
        to complete registration and activate the profile
      </p>
      <BaseButton 
        class="registration-form__button"
        @click="showActivateForm" 
      >
        <span>Activate</span>
      </BaseButton>
    </form>

    <form v-else class="activate-form">
      <h2>Activate</h2>
      <FormInput 
        class="activate-form__input" 
        label="Url"
        v-model="activateUrl"
        placeholder="Insert a link from email"
        name="activateUrl"
      />

      <BaseButton 
        class="activate-form__button"
        @click.prevent="activateUser" 
        :loading="authStore.loading"
        :is-disabled="!activateUrl"
      >
        <span>Send</span>
      </BaseButton>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .registration-form-wrapper {
    padding: 2rem;
    margin: 0 auto;
    max-width: 480px;
    border: solid 1px rgba(0,0,0,.12);
    border-radius: 8px;
    flex-grow: 1;
  }

  .registration-form,
  .activate-form {
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