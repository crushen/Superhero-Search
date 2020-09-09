<template>
  <div>
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header class="content padding-top">
      <h1 class="heading one cursive">Superheroes A-Z</h1>
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
                {{ hero.name }}
                <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loader from '@/components/loaders/Dots'

export default {
  components: {
    loader
  },
  computed: {
    ...mapState('superheroesAtoZ', ['collections', 'loading', 'noScroll'])
  },
  methods: {
    scroll() {
      // Infinite scroll - When user hits bottom of page, add 10 more cards
      window.addEventListener('scroll', () => {
        const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
              pageHeight = document.documentElement.offsetHeight,
              bottomOfWindow = currentScroll >= pageHeight;

        if(bottomOfWindow && !this.noScroll) {
          this.$store.dispatch('superheroesAtoZ/getMoreHeroes')
        }
      }) 
    }
  },
  mounted() {
    this.$store.dispatch('superheroesAtoZ/getSuperheroes')
    this.scroll()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.collection-wrapper {
  margin-top: 54px;
}

.collection {
  border: 6px solid lighten($color: $background, $amount: 7%);
  border-radius: $border-radius;

  &:not(:first-of-type) {
    margin-top: 24px;
  }

  h3 {
    padding: 8px;
    background: lighten($color: $background, $amount: 7%);
  }

  .inner {
    padding: 8px;

    li {
      padding: 2px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(:first-of-type) {
        margin-top: 8px;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid lighten($color: $background, $amount: 7%);
        padding: 2px 2px 10px 2px;
      }

      .icon {
        width: 10px;
        margin-left: 8px;
      }
    }
  }
}
</style>
