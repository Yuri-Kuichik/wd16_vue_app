<script>
import { usePostsStore } from '@/stores/posts';

export default {
    data() {
        return {
            postsStore: usePostsStore()
        }
    },
    async created() {
        await this.postsStore.getPost(this.$route.params.id)
    }
}
</script>

<template>
    <BaseLayout>
        <div class="d-flex d-flex_jcsb">
            <h1>{{ postsStore.postData?.title }}</h1>
            <span>{{ postsStore.postData?.date }}</span>
        </div>
        <div class="d-flex d-flex_jcc">
           <img class="image" :src="postsStore.postData?.image" alt="post image">
        </div>
        <p>{{ postsStore.postData?.text }}</p>
    </BaseLayout>
</template>

<style scoped>
.image {
    margin: 24px auto;
    max-width: 75%;
}
</style>