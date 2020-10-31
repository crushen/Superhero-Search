<template>
  <ul>
    <li v-for="comic in comics" :key="comic.id" class="card">
      <router-link
        :to="{ name: 'Comic', params: { id: comic.id } }"
        data-testid="comic-name">
        <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">

        <div class="text">
          <p class="description heading four">{{ comic.title }}</p>
          <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
        </div>
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
  background: $blue-med;
  border: 8px solid $blue-med;
  border-radius: $border-radius;

  img {
    width: 100%;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .text {
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon {
    width: 10px;
    margin-left: 8px;
  }
}
</style>
