<script>
export default {
  props: {
    postData: {
      type: Object,
      default: ()=>({})
    }
  }
}
</script>

<template>
  <div class="post-list-item">
    <div
        class="item-content-wrapper"
        @click="this.$router.push({name: 'post', params: {id: postData.id}})"
    >
      <div class="img-wrapper">
        <img :src=postData.image>
      </div>
      <div class="text-wrapper">
        <h3>{{ postData.title }}</h3>
        <p class="post-date">от {{ postData.date }}</p>
        <p>{{ postData.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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