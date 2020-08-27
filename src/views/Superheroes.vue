<template>
  <div v-if="collections.length">
    <header class="content padding-top">
      <h1 class="heading one cursive">Superheroes A-Z</h1>
    </header>

    <section>
      <ul>
        <li
          v-for="collection in collections"
          :key="collection.letter">
          <h2>{{ collection.letter }}</h2>
          <ul>
            <li
              v-for="hero in collection.superheroes"
              :key="hero.id">
              {{ hero.name }}
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('superheroesAtoZ', ['collections', 'loading', 'noScroll'])
  },
  methods: {
    scroll() {
      // Infinite scroll - When user hits bottom of page, add 10 more cards
      window.addEventListener('scroll', () => {
        const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
              pageHeight = document.documentElement.offsetHeight,
              bottomOfWindow = currentScroll >= pageHeight;

        if(bottomOfWindow && !this.noScroll) {
          this.$store.dispatch('superheroesAtoZ/getMoreHeroes')
        }
      }) 
    }
  },
  mounted() {
    this.$store.dispatch('superheroesAtoZ/getSuperheroes')
    this.scroll()
  }
}
</script>

<style lang="scss" scoped>

</style>
