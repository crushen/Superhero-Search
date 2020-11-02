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

      <load-more-button
        :noMoreResults="noMoreResults"
        text="Show More Results"
        @load-more="showMore"
        class="margin-m top" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { slugify } from '@/mixins/slugify'
import loadMoreButton from '@/components/buttons/LoadMore'

export default {
  components: { loadMoreButton },
  computed: {
    ...mapState('superheroes', ['collections', 'noMoreResults'])
  },
  methods: {
    slugify,
    showMore() {
      if(!this.noMoreResults) {
        const scrollY = window.scrollY
        this.$store.dispatch('superheroes/getMoreHeroes').then(() => window.scroll(0, scrollY))
      }
    }
  },
  mounted() {
    if(!this.collections.length) {
      this.$store.dispatch('superheroes/getSuperheroes')
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
