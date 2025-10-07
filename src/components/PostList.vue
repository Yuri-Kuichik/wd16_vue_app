<script>
import PostListItem from '@/components/PostListItem.vue'

export default {
  components: {
    PostListItem
  },

  data() {
    return {
      postListData: [],
      loading: false
    }
  },

  methods: {
    async getPostList(url) {
      const res = await fetch('https://studapi.teachmeskills.by/blog/posts/?author__course_group=15&limit=5')
      const data = await res.json()
      this.postListData = data.results
    },

    openPagePost(poistId) {
      console.log('post id: ', poistId)

      this.$router.push({name: 'post', params: {id: poistId} })
    },

    goToNext() {
      
    },

    goToPrev() {
      
    },

    searchPosts() {
      this.getPostList();
    }
  },

  computed: {
    nextPageUrl() {
      return true
    },

    prevPageUrl() {
      return true
    }
  },

  async created() {
    this.loading = true;
    await this.getPostList();
    this.loading = false;
  }
}

</script>

<template>
  <section class="post-list">
    <div class="pagination-wrapper">
      <BaseButton v-show="prevPageUrl" size="s" class="pagination-button" @click="goToPrev">
        Prev
      </BaseButton>
      <div class="d-flex"></div>
      <BaseButton v-show="nextPageUrl" size="s" class="pagination-button" @click="goToNext" text="Next"/>
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

    <VueSpinner v-if="loading" size="l"/>
    <template v-else>
      <div v-for="post in postListData" :key='post.id'>
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