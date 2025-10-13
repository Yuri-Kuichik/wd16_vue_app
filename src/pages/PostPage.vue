<script>
import VueSpinner from "@/components/VueSpinner.vue";

export default {
  components: {VueSpinner},
  data() {
    return {
      postId: this.$route.params.id,
      postData: []
    }
  },

  methods: {
    async getPost() {
      const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${this.postId}/`)
      this.redirectIfNotFound(response.status)
      this.postData = await response.json()
    },
    redirectIfNotFound(status) {
      if (status === 404) {
        this.$router.push({name: 'postNotFound', param: 'post-not-found'})
      }
    }
  },

  async created() {
    await this.getPost()
  }
}
</script>

<template>
  <div v-if="!postData" class="not-found-spinner">
    <VueSpinner
        size="l"
        class="not-found-spinner"
    />
  </div>
  <BaseLayout v-else>
    <div>
      <h3 class="post-header">{{ postData.title }}</h3>
      <div class="post-date">{{ postData.date }}</div>
      <div class="post-img-wrapper">
        <img class="post-img" :src="postData.image"/>
      </div>
      <div class="post-text">{{ postData.text }}</div>
    </div>
  </BaseLayout>

</template>

<style scoped>
.not-found-spinner {
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
}

.post-header {
  font-size: 30px;
}

.post-date, .post-header{
  margin-bottom: 10px;
  text-align: center;
}

.post-text {
  font-size: 20px;
  text-align: justify;
}

.post-img-wrapper {
  margin-bottom: 20px;
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.post-img {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}
</style>