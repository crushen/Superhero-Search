<template>
  <div class="card">
    <img :src="imgSrc" alt="" class="hero-img">

    <p v-if="description" class="description" data-testid="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ['imgSrc', 'description']
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  background: lighten($color: $background, $amount: 7%);
  border-radius: $border-radius;

  img {
    width: 100%;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  .description {
    padding: 1rem;
  }
}
</style>
