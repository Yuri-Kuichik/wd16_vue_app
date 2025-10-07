<script>
export default {
    data() {
        return {
            postData: null
        }
    },
    async created() {
        await this.getPost(this.$route.params.id)
    },
    methods: {
        async getPost(id) {
            try {
                const res = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}/`)
                if (res.ok) {
                    this.postData = await res.json()   
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<template>
    <BaseLayout>
        <div class="d-flex d-flex_jcsb">
            <h1>{{ postData?.title }}</h1>
            <span>{{ postData?.date }}</span>
        </div>
        <div class="d-flex d-flex_jcc">
           <img class="image" :src="postData?.image" alt="post image">
        </div>
        <p>{{ postData?.text }}</p>
    </BaseLayout>
</template>

<style scoped>
.image {
    margin: 24px auto;
    max-width: 75%;
}
</style>