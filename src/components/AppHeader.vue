<script>
import BaseLayout from './BaseLayout.vue';
import FormInput from './FormInput.vue';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore(); 
    return {
      authStore
    }
  },

  components: { BaseLayout, FormInput },

  data() {
    return {
      is_auth: false,
      newEmail: '',
      isShowModalWindow: false,
      password: ''
    }
  },
  
  watch: {
    authStore: {
      handler(state) {
        this.is_auth = state.isAuth()
      },
      deep: true
    }
  },

  methods: {
    signOut() {
      this.authStore.signOut();

      this.$router.push('/login')
    },

    openModalChangeEmail() {
      this.isShowModalWindow = true
    },

    closeModalChangeEmail() {
      this.isShowModalWindow = false
    },
  }
}
</script>

<template>
  <div class="app-header">
    <BaseLayout class="header-section">
      <img class="logo" src="/src/assets/logo.svg" alt="logo Vue">
      <template v-if="is_auth">
        <nav class="d-flex">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/counter">Counter</RouterLink>
          <RouterLink to="/calculator">Calculator</RouterLink>
          <!-- <RouterLink to="/login">Login</RouterLink> -->
        </nav>
        <div @click="openModalChangeEmail" class="btn-sign-out">
          <b>Change email</b>
        </div>
        <div @click="signOut" class="btn-sign-out">
          <b>Sign out</b>
        </div>
      </template>
      
    </BaseLayout>

    <BaseModal v-if="isShowModalWindow" @close="closeModalChangeEmail">
      <template #header>
        <h3>Change email</h3>
      </template>
      <template #description>
        <FormInput 
          label="New email"
          placeholder="Enter new email"
          v-model="newEmail"
        />
        <FormInput 
          label="Password"
          placeholder="Enter new password"
          v-model="password"
        />
      </template>
      <template v-slot:action>
        <BaseButton 
          @click.stop="authStore.setNewEmail(newEmail, password)"
          :loading="authStore.loading"
        >
          <span>send</span>
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.app-header {
  background: var(--color-background-header);
}

.header-section {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.logo {
  width: 30px;
  height: auto;
  margin-right: 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.btn-sign-out {
  cursor: pointer;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>