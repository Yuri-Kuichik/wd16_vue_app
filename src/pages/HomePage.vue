<script>
import PostList from '@/components/PostList.vue';
import { ElButton } from 'element-plus'

export default {
  components: {
    PostList,
    ElButton
  }
  
}
</script>

<template>
  <BaseLayout class="home-page">
    <h1>Home Page</h1>
    <template v-show="false">
      <el-button round type="primary">Click me</el-button>
      <ElButton type="danger" circle><ElIcon><Goods /></ElIcon></ElButton>
    </template>
    <PostList />
  </BaseLayout>
</template>

<style lang="scss" scoped>
  
</style>