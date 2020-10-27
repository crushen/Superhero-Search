<template>
  <ul>
    <li
      v-for="comic in comics"
      :key="comic.id">
      <div class="comic-card">
        <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">
        <router-link
          :to="{ name: 'Comic', params: { id: comic.id } }"
          data-testid="comic-name">
          {{ comic.title }}
        </router-link>
      </div>
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

.comic-card {
  margin-top: 24px;

  img {
    width: 100%;
  }
}
</style>
