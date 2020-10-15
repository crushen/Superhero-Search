<template>
  <div>
    <header class="content padding-top">
      <h1 class="heading one cursive">Comics</h1>
    </header>

    <section class="content">
      <search-bar
        v-model="search"
        @submit-search="submitSearch"
        :label="'Type in a comic name and / or<br> release year to search for a comic.'" />
    </section>

    <section v-if="searchResults.length" class="content padding-bottom">
      <comic-list :comics="searchResults" data-testid="search-results" />
    </section>

    <section v-else class="content padding-bottom">
      <h3 class="heading two">Featured Comics</h3>
      <comic-list :comics="featuredComics" data-testid="featured-comics" />
    </section>

    <p v-if="error">
      Sorry, no search results found.<br>Try searching a release year or comic book title!
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import searchBar from '@/components/SearchBar'
import comicList from '@/components/lists/ComicList'

export default {
  components: { searchBar, comicList },
  data() {
    return {
      search: null
    }
  },
  computed: {
    ...mapState('comics', ['featuredComics', 'searchResults', 'noScroll', 'loading', 'error'])
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
    submitSearch() {
      // get year from search
      const year = this.search.replace(/\D/g, '')
      // get words & hyphenated words from search, and then join to make string
      let title = this.search.match(/\b[a-zA-Z'-]+\b/g)
      
      if(title) { title = title.join(' ') }
      
      this.$store.dispatch('comics/searchComics', {
        year: year, 
        title: title
      })

      window.addEventListener('scroll', this.getMoreComics)
    },
    getMoreComics() {
      const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
            pageHeight = document.documentElement.offsetHeight,
            bottomOfWindow = currentScroll >= pageHeight;

      if(bottomOfWindow && !this.noScroll) {
        // get year from search
        const year = this.search.replace(/\D/g, '')
        // get words & hyphenated words from search, and then join to make string
        let title = this.search.match(/\b[a-zA-Z'-]+\b/g)

        if(title) { title = title.join(' ') }
        
        this.$store.dispatch('comics/getMoreComics', { year: year, title: title })
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
