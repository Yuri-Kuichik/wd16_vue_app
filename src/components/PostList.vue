<script>
import PostListItem from "@/components/PostListItem.vue";
import {usePosts} from "@/stores/posts.js";

export default {
  components: {PostListItem},
  data() {
    return {
      postListArray: [],
      postsStore: usePosts()
    }
  },
  async created() {
    this.postListArray = await this.postsStore.getPostList()
  },
  methods: {
    showPostPage(postId) {
      this.$router.push({name: 'post', params: {id: postId}})
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
        @click="showPostPage(post.id)"
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
