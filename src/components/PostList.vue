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
      const data = await this.getPost(id)
      console.log(data)
    },
    async getPost(id) {
      const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}/`)
      return await response.json()
    }
  }
}

</script>

<template>
  <div class="post-list">
    <PostListItem
        v-for="post in postListArray"
        :key="post.id"
        :post-data=post
        @show-post-page="showPostPage"
    />
  </div>
</template>

<style scoped>

.post-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>
