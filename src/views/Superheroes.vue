<template>
  <main class="padding-top padding-bottom">
    <header class="content margin-m bottom">
      <h1 class="heading one cursive">Superheroes</h1>
    </header>

    <section v-if="collections.length" class="content">
      <ul class="collection-wrapper">
        <li
          v-for="collection in collections"
          :key="collection.superheroes[0].name"
          class="collection">
          <h3>{{ collection.letter }}</h3>
          <ul class="inner">
            <li
              v-for="hero in collection.superheroes"
              :key="hero.id">
              <router-link :to="{ name: 'Hero', params: { name: slugify(hero.name), id: hero.id} }">
                {{ hero.name }}
                <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { slugify } from '@/mixins/slugify'

export default {
  computed: {
    ...mapState('superheroes', ['collections', 'noScroll'])
  },
  methods: {
    slugify,
    getMoreHeroes() {
      // fetch more data when user scrolls to bottom of page
      const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
            pageHeight = document.documentElement.offsetHeight,
            bottomOfWindow = currentScroll >= pageHeight;
      // if no more data, don't dispatch 
      if(bottomOfWindow && !this.noScroll) {
        this.$store.dispatch('superheroes/getMoreHeroes')
      }
    }
  },
  mounted() {
    if(!this.collections.length) {
      this.$store.dispatch('superheroes/getSuperheroes')
    }
    window.addEventListener('scroll', this.getMoreHeroes)
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.getMoreHeroes)
    next()
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
}

.collection {
  border: 6px solid $blue-med;
  background: $blue-med;
  border-radius: $border-radius;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }

  h3 {
    padding: 0.5rem;
    
  }

  .inner {
    padding: 0.5rem;
    background: $blue-dark;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;

    li {
      padding: 2px;

      &:not(:first-of-type) {
        margin-top: 0.5rem;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid $blue-med;
        padding: 2px 2px 10px 2px;
      }

      a {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .icon {
        width: 10px;
        margin-left: 8px;
      }
    }
  }
}
</style>
