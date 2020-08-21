<template>
  <main class="content">
    <section v-if="loading">
      <loader />
    </section>

    <section>
      <div id="hero-search">
        <label for="search">Search for your favorite hero to <br>find out their stats and background</label>
        <div class="input">
          <img src="@/assets/icons/search.svg" alt="">
          <input
            v-model="search"
            id="search"
            type="search"
            autocomplete="off">
        </div>
      </div>
    </section>

    <section v-if="search">
      <hero-list :list="searchResults" />
    </section>

    <section v-else>
      <hero-list :list="superheroes" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import loader from '@/components/loaders/Dots'
import heroList from '@/components/cards/CardList'

export default {
  data() {
    return {
      search: null
    }
  },
  components: {
    loader,
    heroList
  },
  computed: {
    ...mapState(['superheroes', 'searchResults', 'loading', 'attribution', 'noScroll'])
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

        if(bottomOfWindow && !this.noScroll) {
          this.$store.dispatch('getMoreHeroes', this.search)
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

<style lang="scss" scoped>
#hero-search {
  margin-top: 74px;

  label {
    width: 100%;
    text-align: center;
  }

  .input {
    position: relative;
    margin-top: 16px;
  }

  img {
    width: 24px;
    position: absolute;
    top: 6px;
    left: 6px;
  }

  input {
    padding: 10px 16px 10px 40px;
    box-sizing: border-box;
  }
}
</style>