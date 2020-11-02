<template>
  <main>
    <header class="content padding-top">
      <h1 class="heading one cursive">Comics</h1>
    </header>

    <section class="content margin-l top">
      <search-bar
        v-model="search"
        @submit-search="submitSearch"
        :label="'Type in a comic name and / or<br> release year to search for a comic.'" />
    </section>

    <section v-if="searchResults.length" class="content margin-l top padding-bottom">
      <comic-list :comics="searchResults" data-testid="search-results" />

      <load-more-button
        :noMoreResults="noMoreResults"
        text="Show More Comics"
        disabledText="No More Comics"
        @load-more="showMore"
        class="margin-m top" />
    </section>

    <section v-else class="content margin-l top padding-bottom">
      <h3 class="heading two margin-m bottom">Featured Comics</h3>
      <comic-list :comics="featuredComics" data-testid="featured-comics" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import searchBar from '@/components/SearchBar'
import loadMoreButton from '@/components/buttons/LoadMore'
import comicList from '@/components/lists/ComicList'

export default {
  components: { searchBar, loadMoreButton, comicList },
  data() {
    return {
      search: null
    }
  },
  computed: {
    ...mapState('comics', ['featuredComics', 'searchResults', 'noMoreResults'])
  },
  watch: {
    search(string) {
      if(!string) {
        this.$store.commit('comics/clearSearchResults')
        window.removeEventListener('scroll', this.getMoreComics)
      }
    }
  },
  methods: {
    formatSearch(searchString) {
      // get year from search
      const year = searchString.replace(/\D/g, '')
      // get words & hyphenated words from search, and then join to make string
      let title = searchString.match(/\b[a-zA-Z'-]+\b/g)
      
      if(title) { 
        title = title.join(' ')
      }

      return { year: year, title: title }
    },
    submitSearch() {
      this.$store.dispatch('comics/searchComics', this.formatSearch(this.search))
    },
    showMore() {
      if(!this.noMoreResults) {

        const scrollY = window.scrollY
        this.$store.dispatch('comics/getMoreComics', this.formatSearch(this.search)).then(() => window.scroll(0, scrollY))
      }
    }
  },
  mounted() {
    this.$store.commit('comics/clearSearchResults')

    if(!this.featuredComics.length) {
      this.$store.dispatch('comics/getComics', 77792) // black panther
      this.$store.dispatch('comics/getComics', 82519) // spider-man
      this.$store.dispatch('comics/getComics', 82500) // captain marvel
      this.$store.dispatch('comics/getComics', 65940) // guardians
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  text-align: center;
}

.heading.one {
  font-size: 3.5rem;
}
</style>
