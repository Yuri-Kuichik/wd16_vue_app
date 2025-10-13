<script>
export default {
  data() {
    return {
      sorryImgs: [
          'https://media1.tenor.com/m/TRe5NGqnQEkAAAAd/were-sorry-tony-hayward.gif',
          'https://media1.tenor.com/m/601zsjqXi-YAAAAd/were-sorry-tony-hayward.gif',
          'https://media1.tenor.com/m/Yc4yChQTWTYAAAAd/we-are-sorry-tony-hayward.gif'
      ]
    }
  },
  methods: {
    getRandomImg() {
      const randomIndex = Math.floor(Math.random() * this.sorryImgs.length)
      return this.sorryImgs[randomIndex]
    }
  }
}
</script>

<template>
  <BaseLayout>
    <div class="post-not-found">
      <h3>post not found</h3>
      <div class="img-wrapper">
        <img :src="this.getRandomImg()" alt="we're sorry"/>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.post-not-found {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-not-found h3 {
  margin-bottom: 20px;
  font-size: 40px;
  text-transform: uppercase;
}

.img-wrapper {
  max-height: 300px;
  max-width: 300px;
}
.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>