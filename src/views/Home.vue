<template>
  <div class="home">
    <div v-if="loading">
      <p>...loading</p>
    </div>

    <div v-if="superheroes.length">
      <ul>
        <li
          v-for="hero in superheroes"
          :key="hero.id">
          {{ hero.name }}

          <img :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`" alt="">
        </li>
      </ul>

      <p v-html="attribution" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['superheroes', 'loading', 'attribution'])
  },
  methods: {
    scroll() {
      // Infinite scroll - When user hits bottom of page, add 10 more cards
      window.addEventListener('scroll', () => {
        const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
              pageHeight = document.documentElement.offsetHeight,
              bottomOfWindow = currentScroll >= pageHeight;

        if(bottomOfWindow) {
          this.$store.dispatch('getMoreHeroes')
        }
      }) 
    }
  },
  mounted() {
    this.$store.dispatch('getSuperheroes')
    this.scroll()
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
</style>
