<script setup>
import { usePostsStore } from '@/stores/posts';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import PostListItem from '@/components/PostListItem.vue'
import FormInput from './FormInput.vue';

const router = useRouter()
const postsStore = usePostsStore();
const mounted = ref(false)

const openPagePost = (poistId) => {
  router.push({name: 'post', params: {id: poistId} })
}

postsStore.getPostList()

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section v-if="mounted" class="post-list">
    <div class="pagination-wrapper">
      <BaseButton 
        v-show="postsStore.isPrevPageUrl" 
        size="s" 
        class="pagination-button" 
        @click="postsStore.getPrevPage"
      >
        Prev
      </BaseButton>
      <div class="d-flex"></div>
      <BaseButton 
        v-show="postsStore.isNextPageUrl"  
        class="pagination-button" 
        @click="postsStore.getNextPage" 
        size="s"
        text="Next"
      />
    </div>

    <div class="d-flex">
        <FormInput
          v-model="postsStore.search"
        />
        <BaseButton 
          class="pagination-button" 
          @click="postsStore.serchPosts" 
          size="s"
          text="Search"
        />
      </div>

    <!-- <div class="post-list__search-wrapper">
      <BaseInput 
        class="post-list__search-input" 
        placeholder="Input post text"
        v-model="postsStore.searchString"
      />
      <BaseButton class="post-list__search-button" @click="searchPosts">
        Search
      </BaseButton>
    </div> -->

    <VueSpinner v-if="postsStore.loading" size="l"/>
    <template v-else>
      <div v-for="post in postsStore.getPosts" :key='post.id'>
        <PostListItem :model="post" @click="openPagePost(post.id)"/>
      </div>
    </template>
    
  </section>
</template>


<style lang="scss" scoped>
.post-list {
  padding: 32px 16px; 
  background-color: rgba(0,0,0, .03);
  border-radius: 8px; 
  text-align: center;

  &__search-input {
    padding-bottom: 20px;
  }

  &__search-wrapper {
    display: flex; 
    gap: 12px;

    .post-list__search-input {
      flex-grow: 1;
    }

    .post-list__search-button {
      max-width: 200px;
    }
  }

  .limit {
    margin-right: 12px; 
    cursor: pointer;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .pagination-button {
    max-width: 150px;
  }
}

</style>