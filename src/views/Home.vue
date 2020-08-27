<template>
  <div>
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header class="content padding-top">
      <h1 class="heading one cursive">Superhero <span>Search</span></h1>
      <h2 class="heading four">All of your favorite Marvel <br>heroes in one place.</h2>
    </header>

    <section class="content">
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

    <section v-if="search" class="content padding-bottom">
      <hero-list :list="searchResults" />
    </section>

    <section v-else class="content padding-bottom">
      <hero-list :list="superheroes" />
    </section>
  </div>
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
    ...mapState('superheroes', ['superheroes', 'searchResults', 'loading', 'noScroll'])
  },
  watch: {
    search(string) {
      if(string) {
        this.$store.dispatch('superheroes/searchHeroes', string)
      } else {
        this.$store.dispatch('superheroes/getSuperheroes')
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
          this.$store.dispatch('superheroes/getMoreHeroes', this.search)
        }
      }) 
    }
  },
  mounted() {
    this.$store.dispatch('superheroes/getSuperheroes')
    this.scroll()
  }
}
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}

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