<script setup>
import FormInput from './FormInput.vue';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore(); 
const is_auth = ref(false)
const newEmail = ref('')
const isShowModalWindow = ref(false)
const password = ref('')

const isAuthStore = computed(() => {
  return !!authStore.refreshToken
})

const signOut = () => {
  authStore.signOut();
  router.push('/login')
}
const openModalChangeEmail = () => {
  isShowModalWindow.value = true
}
const closeModalChangeEmail = () => {
  isShowModalWindow.value = false
}

onMounted(() => {
  console.log(is_auth.value)
})
</script>

<template>
  <div class="app-header">
    <BaseLayout class="header-section">
      <img class="logo" src="/src/assets/logo.svg" alt="logo Vue">
      <template v-if="isAuthStore">
        <nav class="d-flex">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/counter">Counter</RouterLink>
          <RouterLink to="/calculator">Calculator</RouterLink>
          <!-- <RouterLink to="/login">Login</RouterLink> -->
        </nav>
        count: {{ count }}
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