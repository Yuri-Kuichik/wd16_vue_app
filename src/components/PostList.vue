<script>
import PostListItem from "@/components/PostListItem.vue";

export default {
  components: {PostListItem},
  data() {
    return {
      postListArray: [],
    }
  },
  async created() {
    this.postListArray = await this.getPostList()
  },
  methods: {
    async getPostList() {
      const response = await fetch('https://studapi.teachmeskills.by/blog/posts/?author__course_group=15&limit=5')
      const data = await response.json()
      return data.results
    },
    // По id поста получаем информацию от удалённого сервера.
    async showPostPage(id) {
      const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}/`)
      const data = await response.json()
      console.log(data)
    }
  }
}

</script>

<template>
  <div class="post-list">
    <div class="post-list-item" v-for="post in postListArray" :key="post.id">
      <PostListItem
          :post-data=post
          @show-post-page="showPostPage"
      />
    </div>
  </div>
</template>

<style scoped>

.post-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.post-list-item {
  padding: 20px;
  max-width: 33%;
}
</style>
