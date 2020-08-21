<template>
  <div class="content">
    <div v-if="loading">
      <loader />
    </div>

    <div>
      <label for="hero-search">Search</label>
      <input
        v-model="search"
        type="search"
        name="hero-search"
        id="hero-search">
    </div>

    <div v-if="search">
      <ul>
        <li
          v-for="hero in searchResults"
          :key="hero.id">
          
          <hero-card :hero="hero" class="hero-card" />
        </li>
      </ul>

      <p v-html="attribution" />
    </div>

    <div v-else>
      <ul>
        <li
          v-for="hero in superheroes"
          :key="hero.id">

          <hero-card :hero="hero" class="hero-card" />
        </li>
      </ul>

      <p v-html="attribution" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loader from '@/components/loaders/Dots'
import heroCard from '@/components/cards/HeroCard'

export default {
  data() {
    return {
      search: null
    }
  },
  components: {
    loader,
    heroCard
  },
  computed: {
    ...mapState(['superheroes', 'searchResults', 'loading', 'attribution'])
  },
  watch: {
    search(string) {
      if(string) {
        this.$store.dispatch('searchHeroes', string)
      } else {
        this.$store.dispatch('getSuperheroes')
      }
    }
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
