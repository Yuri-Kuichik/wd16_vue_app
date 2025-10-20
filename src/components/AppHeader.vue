<script>
import { useAuthStore } from "@/stores/auth.js";
import FormInput from "@/components/FormInput.vue";

export default {
  components: {
    FormInput
  },
  data() {
    return {
      authStore: useAuthStore(),
      isModalOpen: false,
      newEmail: '',
      password: ''
    }
  },

  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    }
  },

  watch: {
    authStore: {
      handler(state) {
        return state.isAuth()
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="app-header">
    <BaseLayout class="header-section">
      <img class="logo" src="/src/assets/logo.svg" alt="logo Vue">
      <nav
          class="d-flex"
          v-if="authStore.isAuth()"
      >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/counter">Counter</RouterLink>
        <RouterLink to="/calculator">Calculator</RouterLink>
      </nav>
      <div class="btn-sign-out"
           v-if="authStore.isAuth()"
           @click.stop="openModal"
      >
        <b>Change email</b>
      </div>
      <div class="btn-sign-out"
           v-if="authStore.isAuth()"
           @click.stop="authStore.logout()"
      >
        <b>Sign out</b>
      </div>
    </BaseLayout>
    <BaseModal
      v-if="isModalOpen"
      @close="closeModal()"
    >
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
            @click.stop="authStore.changeEmail(newEmail, password)"
            text="Change"
        >
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
  color: #000;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>