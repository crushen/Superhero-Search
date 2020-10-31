<template>
  <main>
    <div v-if="comic">
      <header class="content padding-top">
        <h1 data-testid="title">{{ comic.title }}</h1>

        <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">

        <p v-if="comic.description" v-html="comic.description" />
      </header>

      <section class="content padding-bottom">
        <h2>Creators</h2>
        <ul v-if="comic.creators.items.length">
          <li
            v-for="creator in comic.creators.items"
            :key="creator.name">
            <b>{{ creator.role }}:</b> {{ creator.name }}
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('comicPage', ['comic'])
  },
  mounted() {
    this.$store.dispatch('comicPage/getComic', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

img {
  width: 100%;
  margin: 24px 0;
}

.comics {
  margin-top: 40px;
}

li {
  margin-top: 8px;
}

b {
  text-transform: capitalize;
}
</style>
