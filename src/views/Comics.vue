<template>
  <div>
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header class="content padding-top">
      <h1 class="heading one cursive">Comics</h1>
    </header>

    <div id="comic-search" class="search-container content">
      <label for="comic-search">Type in a comic name and / or<br> release year to search for a comic.</label>
      <div class="search">
        <div class="input">
          <img src="@/assets/icons/search.svg" alt="">
          <input
            v-model="search"
            id="search"
            type="search"
            autocomplete="off">
        </div>
        <button @click="submitSearch">Search</button>
      </div>
    </div>

    <div class="content padding-bottom">
      <ul v-if="searchResults.length">
        <li
          v-for="comic in searchResults"
          :key="comic.id">
          <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">
          <router-link :to="{ name: 'Comic', params: { id: comic.id } }">
            {{ comic.title }}
          </router-link>
        </li>
      </ul>

      <p v-if="error">
        Sorry, no search results found.<br>Try searching a release year or comic book title!
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loader from '@/components/loaders/Dots'

export default {
  components: {
    loader
  },
  data() {
    return {
      search: null
    }
  },
  computed: {
    ...mapState('comics', ['comics', 'searchResults', 'loading', 'error'])
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
        
        this.$store.dispatch('comics/getMoreComics', {
          year: year, 
          title: title
        })
      }
    }
  },
  mounted() {
    this.$store.commit('comics/clearSearchResults')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

li {
  margin-top: 24px;

  img {
    width: 100%;
  }
}
</style>
