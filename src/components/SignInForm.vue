<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            passwordFieldType: 'password'
        }
    }
}
</script>

<template>
    <div class="sign-in-form-wrapper">
        <form class="sign-in-form">
            <h2 class="sign-in-form__title">Sign In</h2>
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