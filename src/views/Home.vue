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
    </section>

    <section v-if="searchResults.length" class="content padding-bottom">
      <hero-list :list="searchResults" />
    </section>

    <section v-else class="content padding-bottom">
      <h3 class="heading two">Featured Heroes</h3>
      <hero-list :list="featuredHeroes" />
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
    ...mapState('home', ['featuredHeroes', 'searchResults', 'loading', 'noScroll'])
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

h3 {
  margin-top: 48px;
}

#hero-search {
  margin-top: 74px;

  label {
    width: 100%;
    text-align: center;
  }

  .search {
    margin-top: 16px;
    display: flex;
    align-items: center;

    .input {
      position: relative;
      

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

    button {
      width: 100px;
      height: 39px;
      background: $accent;
      border-radius: $border-radius;
      margin-left: 8px;
    }
  }
}
</style>
