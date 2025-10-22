<script>
import PostListItem from "@/components/PostListItem.vue";
import {usePosts} from "@/stores/posts.js";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";


export default {
  components: {
    BaseButton,
    PostListItem,
    BaseInput
  },
  data() {
    return {
      postsStore: usePosts()
    }
  },
  async created() {
    await this.postsStore.getPostList()
  }
}

</script>

<template>
  <div class="search-wrapper d-flex">
    <BaseInput
        name="search"
        placeholder="Поиск"
        v-model="postsStore.getParams.search"
    />
    <BaseButton
        text="Найти"
        size="s"
        @click="postsStore.getPostList()"
    />
  </div>
  <div class="pagination d-flex">
    <BaseButton
        v-show="postsStore.postListData.previous"
        text="Предыдущая"
        size="s"
        @click="postsStore.turnPage('previous')"
    />
    <div class="filler"></div>
    <BaseButton
        v-show="postsStore.postListData.next"
        text="Следующая"
        size="s"
        @click="postsStore.turnPage('next')"
    />
  </div>
  <div class="post-list">
    <PostListItem
        v-for="post in postsStore.postListData.results"
        :key="post.id"
        :post-data=post
        @click="postsStore.showPostPage(post.id)"
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

.search-wrapper, .pagination {
  margin-bottom: 20px;
}

.filler {
  flex-grow: inherit;
}
</style>
