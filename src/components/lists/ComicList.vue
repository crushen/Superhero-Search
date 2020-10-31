<template>
  <ul>
    <li v-for="comic in comics" :key="comic.id" class="card">
      <router-link
        :to="{ name: 'Comic', params: { id: comic.id } }"
        data-testid="comic-name">
        <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">

        <p class="description heading four">{{ comic.title }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['comics']
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

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}
</style>
