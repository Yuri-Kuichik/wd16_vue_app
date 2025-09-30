<script>

export default {
  
}
</script>

<template>
  <BaseLayout>
    <section class="calculator-section">
      <div class="calculator-wrapper">
        <h2 class="calculator-title">Calculator</h2>
        
        <span class="calculator-text">Result: </span>
      </div>
    </section>
  </BaseLayout>
</template>


<style lang="scss" scoped>
.calculator-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.calculator-wrapper {
  margin: auto;
  max-width: 250px;
  text-align: center;
}

.calculator-buttons-wrapper {
  display: flex;
  column-gap: 25px;
  padding: 20px;
}

button {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background: rgb(253, 211, 42);
  color: rgb(7, 7, 7);
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;
  height: 48px;
  min-height: 48px;
  max-width: 240px;

  &.disabled {
    cursor: cell;
    background: rgba(253, 211, 42, 0.5);
  }
}

input {
  padding: 8px 12px;
  width: 100%;
  min-height: 32px;
  border: 1px solid var(--color-input);
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  background: var(--color-white) !important;
  margin-bottom: 12px;
  max-width: 240px;

  &::placeholder {
    color: rgba(0, 0, 0, .26);
  }

  &:focus-visible {
    border: 3px solid rgb(253, 211, 42);
  }
}
</style>