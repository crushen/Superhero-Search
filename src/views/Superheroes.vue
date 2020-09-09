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
              <router-link :to="{ name: 'HeroPage', params: { name: slugify(hero.name), id: hero.id} }">
                {{ hero.name }}
                <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
              </router-link>
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
    getMoreHeroes() {
      // fetch more data when user scrolls to bottom of page
      const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
            pageHeight = document.documentElement.offsetHeight,
            bottomOfWindow = currentScroll >= pageHeight;
      // if no more data, don't dispatch 
      if(bottomOfWindow && !this.noScroll) {
        this.$store.dispatch('superheroesAtoZ/getMoreHeroes')
      }
    },
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, '')
      // Make the string lowercase
      str = str.toLowerCase()
      // Remove accents, swap ñ for n, etc
      var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
      var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }
      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '') 
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-') 
      // Collapse dashes
      .replace(/-+/g, '-')
      return str
    }
  },
  mounted() {
    if(!this.collections.length) {
      this.$store.dispatch('superheroesAtoZ/getSuperheroes')
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

      &:not(:first-of-type) {
        margin-top: 8px;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid lighten($color: $background, $amount: 7%);
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
