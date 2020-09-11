<template>
  <div v-if="hero.info">
    <header class="content padding-top">
      <h1>{{ hero.info.name }}</h1>

      <img :src="`${hero.info.thumbnail.path}.${hero.info.thumbnail.extension}`" alt="">

      <p v-if="hero.info.description">{{ hero.info.description }}</p>
    </header>

    <section
      v-if="hero.comics.length"
      class="comics content padding-bottom">
      <h2>Comics</h2>

      <ul>
        <li
          v-for="comic in hero.comics"
          :key="comic.id">
          <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">
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

img {
  width: 100%;
  margin: 24px 0;
}

.comics {
  margin-top: 40px;
}
</style>
