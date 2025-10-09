<script>
import SignInForm from '@/components/SignInForm.vue';
import FormInput from '@/components/FormInput.vue';
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    SignInForm
  }
}
</script>

<template>
  <BaseLayout>
    <SignInForm />
  </BaseLayout>
</template>
