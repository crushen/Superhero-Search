<template>
  <main>
    <header class="content padding-top">
      <h1 class="heading one cursive">Superhero <span>Search</span></h1>
      <h2 class="heading four margin-s top">All of your favorite Marvel <br>heroes in one place</h2>
    </header>

    <section class="content margin-l top">
      <search-bar
        v-model="search"
        @submit-search="submitSearch"
        :label="'Search for your favorite hero to <br>find out their stats and background'" />
    </section>

    <section v-if="searchResults.length" class="content margin-l top padding-bottom">
      <hero-list :heroes="searchResults" data-testid="search-results" />

      <load-more-button
        :noMoreResults="noMoreResults"
        text="Show More Heroes"
        disabledText="No More Heroes"
        @load-more="showMore"
        class="margin-m top" />
    </section>

    <section v-else class="content margin-l top padding-bottom">
      <h3 class="heading two margin-m bottom">Featured Heroes</h3>
      <hero-list :heroes="featuredHeroes" data-testid="featured-heroes" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import searchBar from '@/components/SearchBar'
import loadMoreButton from '@/components/buttons/LoadMore'
import heroList from '@/components/lists/HeroList'

export default {
  data() {
    return {
      search: null
    }
  },
  components: {
    searchBar,
    loadMoreButton,
    heroList
  },
  computed: {
    ...mapState('home', ['featuredHeroes', 'searchResults', 'noMoreResults'])
  },
  watch: {
    search(string) {
      if(!string) {
        this.$store.commit('home/clearSearchResults')
      }
    }
  },
  methods: {
    submitSearch() {
      this.$store.dispatch('home/searchHeroes', this.search)
    },
    showMore() {
      if(!this.noMoreResults) {
        const scrollY = window.scrollY
        this.$store.dispatch('home/getMoreHeroes', this.search).then(() => window.scroll(0, scrollY))
      }
    }
  },
  mounted() {
    this.$store.commit('home/clearSearchResults')

    if(!this.featuredHeroes.length) {
      this.$store.dispatch('home/getHero', 1009165) // avengers
      this.$store.dispatch('home/getHero', 1010338) // captain marvel
      this.$store.dispatch('home/getHero', 1009368) // iron man 
      this.$store.dispatch('home/getHero', 1017603) // spider gwen
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

header {
  text-align: center;
}

.heading.one {
  font-size: 3.5rem;
  
  span {
    display: block;
  }
}
</style>
