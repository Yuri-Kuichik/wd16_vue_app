<script setup>
import PostListItem from "@/components/PostListItem.vue";
import {usePosts} from "@/stores/posts.js";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { Search, ArrowLeft, ArrowRight } from  "@element-plus/icons-vue";

const postsStore = usePosts();

postsStore.getPostList()

</script>

<template>
  <div class="search-wrapper d-flex">
    <BaseInput
        name="search"
        placeholder="Поиск"
        v-model="postsStore.getParams.search"
    />
    <el-button
      class="new-search-button"
      type="warning"
      :icon="Search"
      @click="postsStore.getPostList()"
    >
      Найти
    </el-button>

  </div>
  <div class="pagination d-flex">
    <el-button
      type="warning"
      :icon="ArrowLeft"
      @click="postsStore.turnPage('previous')"
      v-show="postsStore.postListData.previous"
    >
      Предыдущая
    </el-button>
    <div class="filler"></div>
    <el-button
        type="warning"
        @click="postsStore.turnPage('next')"
        v-show="postsStore.postListData.next"
    >
      Следующая <el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
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

.new-search-button {
  height: 36px;
  width: 240px;
}
</style>
