<script>
export default {
  props: {
    postData: {
      type: Object,
      default: {}
    }
  }
}
</script>

<template>
  <div
      class="item-content-wrapper"
      @click="$emit(`showPostPage`, postData.id)"
  >
    <div class="img-wrapper">
      <img :src=postData.image>
    </div>
    <div class="text-wrapper">
      <h3>{{ postData.title }}</h3>
      <p class="post-date">от {{ postData.date }}</p>
      <p class="post-description">{{ postData.description }}</p>
    </div>
  </div>
</template>

<style scoped>

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