<script>
import SignInForm from '@/components/SignInForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
    components: {
        SignInForm,
        RegistrationForm
    },

    data() {
        return {
            activeComponentName: 'SignInForm'
        }
    },

    computed: {
        isActiveSignInForm() {
            return this.activeComponentName === 'SignInForm'
        }
    },

    methods: {
        toggleForm() {
            this.activeComponentName = this.isActiveSignInForm
                ? 'RegistrationForm' 
                : 'SignInForm'
        }
    }
}
</script>

<template>
    <BaseLayout>
        <component 
            :is="activeComponentName"
            @toggle="toggleForm"
        />
    </BaseLayout>
</template>