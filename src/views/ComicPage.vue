<template>
  <main v-if="comic" class="padding-top padding-bottom">
    <header class="content">
      <h1 data-testid="title" class="heading one margin-m bottom">{{ comic.title }}</h1>

      <comic-card :comic="comic" />
    </header>

    <section
      v-if="characters.length"
      class="content margin-l top">
      <h2 class="heading two margin-m bottom">Featured Heroes</h2>

      <hero-list :heroes="characters" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import comicCard from '@/components/cards/ComicCard'
import heroList from '@/components/lists/HeroList'

export default {
  components: { comicCard, heroList },
  computed: {
    ...mapState('comicPage', ['comic', 'characters'])
  },
  mounted() {
    this.$store.dispatch('comicPage/getComic', this.$route.params.id)
    this.$store.dispatch('comicPage/getCharacters', this.$route.params.id)
  }
}
</script>
