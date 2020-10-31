<template>
  <div v-if="hero.info">
    <header class="content padding-top">
      <h1 class="heading one margin-m bottom" data-testid="name">{{ hero.info.name }}</h1>

      <hero-card
        :imgSrc="`${hero.info.thumbnail.path}.${hero.info.thumbnail.extension}`"
        :description="hero.info.description" />
    </header>

    <section
      v-if="hero.comics.length"
      class="content margin-l top padding-bottom">
      <h2 class="heading two margin-m bottom">Featured Comics</h2>

      <comic-list
        v-if="hero.comics"
        :comics="hero.comics" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import heroCard from '@/components/cards/HeroCard'
import comicList from '@/components/lists/ComicList'

export default {
  components: { heroCard, comicList },
  computed: { ...mapState('heroPage', ['hero']) },
  mounted() {
    this.$store.dispatch('heroPage/getHero', this.$route.params.id)
    this.$store.dispatch('heroPage/getComics', this.$route.params.id)
  }
}
</script>
