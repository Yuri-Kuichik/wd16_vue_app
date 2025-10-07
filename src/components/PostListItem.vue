<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="post_wrapper d-flex">
    <div class="post_content">
      <h2>{{ model?.title }}</h2>
      <p>{{ model?.description }}</p>
    </div>
    <div class="post_image">
      <img :src="model?.image" :alt="model.id">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d-flex {
  align-items: center;
  justify-content: space-between;
}

.post_wrapper {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;

  .post_content {
    padding: 10px;
    margin: 10px 0;
  }

  .post_image {
    position: relative;
    max-width: 200px;
    border: 2px solid #000;
    overflow: hidden;

    & > img {
        width: 100%;
        height: auto;
    }
  }
}
</style>