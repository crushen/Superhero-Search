<template>
  <div>
    <header class="content padding-top">
      <h1 class="heading one cursive">Superhero <span>Search</span></h1>
      <h2 class="heading four">All of your favorite Marvel <br>heroes in one place.</h2>
    </header>

    <section class="content">
      <search-bar
        v-model="search"
        @submit-search="submitSearch"
        :label="'Search for your favorite hero to <br>find out their stats and background'" />
    </section>

    <section v-if="searchResults.length" class="content padding-bottom">
      <hero-list :list="searchResults" data-testid="search-results" />
    </section>

    <section v-else class="content padding-bottom">
      <h3 class="heading two">Featured Heroes</h3>
      <hero-list :list="featuredHeroes" data-testid="featured-heroes" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import searchBar from '@/components/SearchBar'
import heroList from '@/components/cards/CardList'

export default {
  data() {
    return {
      search: null
    }
  },
  components: {
    searchBar,
    heroList
  },
  computed: {
    ...mapState('home', ['featuredHeroes', 'searchResults', 'noScroll'])
  },
  watch: {
    search(string) {
      if(!string) {
        this.$store.commit('home/clearSearchResults')
        window.removeEventListener('scroll', this.getMoreHeroes)
      }
    }
  },
  methods: {
    submitSearch() {
      this.$store.dispatch('home/searchHeroes', this.search)
      window.addEventListener('scroll', this.getMoreHeroes)
    },
    getMoreHeroes() {
      const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
            pageHeight = document.documentElement.offsetHeight,
            bottomOfWindow = currentScroll >= pageHeight;
      if(bottomOfWindow && !this.noScroll) {
        this.$store.dispatch('home/getMoreHeroes', this.search)
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
  font-size: 56px;
  
  span {
    display: block;
  }
}

h2 {
  margin-top: 24px;
}

h3 {
  margin-top: 48px;
}
</style>
