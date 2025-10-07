<script>
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList
  }
  
}
</script>

<template>
  <BaseLayout class="home-page">
    <h1>Home Page</h1>
    <PostList />
  </BaseLayout>
</template>

<style lang="scss" scoped>
  
</style>