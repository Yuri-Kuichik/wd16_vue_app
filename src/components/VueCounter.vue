<script>
import {h} from 'vue'

export default {
    data() {
        return {
            count: 0,
            text: 'Name user',
            namePage: 'home-page',
            homePageArray: [
                {
                    name: 'Home',
                    id: 11
                },
                {
                    name: 'Calculator',
                    id: 12
                },
                {
                    name: 'Post',
                    id: 13
                }
            ]
        }
    },

    methods: { 
        onSubmit() {
            console.log('submit form')
        },

        changeNamePage(name) {
            console.log(this)
            this.namePage = name
        }
    },

    computed: {
        isButtonDisabled() {
            return this.count < 10 
        }
    }
}
</script>

<template>
    <div class="vue-counter" @click="onSubmit">
        <h2>{{ count > 0  ? count : 'Count is null' }}</h2>
        <button @click="count++">Increment</button>
        <button @click="count--">Decrement</button>

        <div>
            <button @click.stop="changeNamePage('home-page')">Home</button>
            <button @click.stop="changeNamePage('calculator-page')">Calculator</button>
            <button @click.stop="changeNamePage('post-page')">Post</button>
        </div>

        <div v-show="namePage === 'home-page'">
            <div v-for="item in homePageArray" :key="item.id">
               Name page: {{ item.name }}
               id page: {{ item.id }} 
            </div>
        </div>
        <div v-show="namePage === 'calculator-page'">calculator page</div>
        <div v-show="namePage === 'post-page'">post page</div>



        <div v-if="count < 5">Слишком мало</div>
        <div v-else-if="count < 10">Среднее</div>
        <div v-else>Слишком много</div>
       
    </div>

</template>

<style>
.vue-counter {
    padding-bottom: 3rem;
}

</style>