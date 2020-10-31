<template>
  <div v-if="hero.info">
    <header class="content padding-top">
      <h1 class="margin-m bottom" data-testid="name">{{ hero.info.name }}</h1>

      <div class="img-card">
        <img :src="`${hero.info.thumbnail.path}.${hero.info.thumbnail.extension}`" alt="" class="hero-img">

        <p v-if="hero.info.description" class="description">{{ hero.info.description }}</p>
      </div>

    </header>

    <section
      v-if="hero.comics.length"
      class="content margin-l top padding-bottom">
      <h2>Featured Comics</h2>

      <ul>
        <li
          v-for="comic in hero.comics"
          :key="comic.id">
          <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">
          <p data-testid="comic-title">{{ comic.title }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('heroPage', ['hero'])
  },
  mounted() {
    this.$store.dispatch('heroPage/getHero', this.$route.params.id)
    this.$store.dispatch('heroPage/getComics', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

img {
  width: 100%;
}

.img-card {
  background: lighten($color: $background, $amount: 7%);
  border-radius: $border-radius;

  img {
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  .description {
    padding: 1rem;
  }
}
</style>
