<script>
import BaseLayout from '@/components/BaseLayout.vue';
import PostList from '@/components/PostList.vue';

export default {
  components: { BaseLayout, PostList }
}
</script>

<template>
  <BaseLayout>
    <h1>Home Page</h1>
    <PostList />
  </BaseLayout>
</template>

<style lang="scss" scoped>
  
</style>