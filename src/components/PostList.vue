<script>
export default {
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
      return await data.results
    }
  }
}

</script>

<template>
  <div class="post-list">
    <div class="post-list-item" v-for="({ title, description, image, date }) in postListArray">
      <div class="item-content-wrapper">
        <div class="img-wrapper">
          <img :src=image>
        </div>
        <div class="text-wrapper">
          <h3>{{ title }}</h3>
          <p class="post-date">от {{ date }}</p>
          <p class="post-description">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.post-list-item {
  padding: 20px;
  max-width: 33%;

}

.item-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.img-wrapper {
  width: 200px;
  height: 150px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
h3 {
  text-align: center;
}

.post-date {
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
}
</style>
