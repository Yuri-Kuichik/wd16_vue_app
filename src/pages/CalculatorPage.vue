<script>
import BaseLayout from '../components/BaseLayout.vue'

export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      firstOperand: 0,
      secondOperand: 0,
      currentOperator: '+',
    }
  },
  methods: {
    // Переключаем оператор. По умолчанию включен оператор сложения.
    switchOperator(e) {
      const currentButton = e.target
      const chosenOperator = currentButton.innerText

      // Если выбранный оператор уже активен, то выходим из функции.
      if(currentButton.classList.contains('disabled')) {
        return
      }

      // Делаем все кнопки активными, а потом деактивируем кнопку с выбранным оператором.
      this.enableAllButtons()
      currentButton.classList.add('disabled')

      // Обновляем текущий оператор.
      this.currentOperator = chosenOperator
    },

    // Убираем у всех кнопок класс disabled.
    enableAllButtons() {
      const buttons = this.$refs.calcInterface.querySelectorAll('button')
      buttons.forEach((button) => {
        button.classList.remove('disabled')
      })
    },

    // Отслеживаем изменения в полях с операндами и обновляем их значения в data().
    // Если введено не число, или строка ввода не пуста, то не меняем значение count.
    setFirstOperand(e) {
      const newFirstOperand = e.target.value
      if (this.isCorrectOperandValue(newFirstOperand)) {
        this.firstOperand = e.target.value
      } else {
        e.target.value = this.firstOperand
      }
    },
    setSecondOperand(e) {
      const newSecondOperand = e.target.value
      if (this.isCorrectOperandValue(newSecondOperand)) {
        this.secondOperand = e.target.value
      } else {
        e.target.value = this.secondOperand
      }
    },

    // Проверяем, чтобы новое значение оператора было либо числом, либо нулём, либо пустой строкой.
    isCorrectOperandValue(value) {
      return !!(Number(value) || value === '0' || value.length === 0);
    }
  },
  computed: {
    // Вычисляем результат, в зависимости от текущего выбранного оператора currentOperator. По умолчанию '+'.
    computeResult() {
      switch (this.currentOperator) {
        case "+":
          return +this.firstOperand + +this.secondOperand
        case "-":
          return this.firstOperand - this.secondOperand
        case "*":
          return this.firstOperand * this.secondOperand
        case "/":
          return this.firstOperand / this.secondOperand
      }
    }
  }
}
</script>

<template>
  <BaseLayout>
    <section class="calculator-section">
      <div class="calculator-wrapper">
        <h2 class="calculator-title">Calculator</h2>
        <div class="calculator-interface" ref="calcInterface">
          <input type="text" :value="firstOperand" @input="setFirstOperand">
          <button @click="switchOperator" class="disabled">+</button>
          <button @click="switchOperator">-</button>
          <button @click="switchOperator">*</button>
          <button @click="switchOperator">/</button>
          <input type="text" :value="secondOperand" @input="setSecondOperand">
        </div>
        <span class="calculator-text">Result: {{ computeResult }}</span>
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
  margin-bottom: 5px;
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

.calculator-interface {

}
</style>