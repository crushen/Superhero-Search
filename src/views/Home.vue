<template>
  <div class="home">
    <div v-if="loading">
      <p>...loading</p>
    </div>

    <div v-if="superheroes.length">
      <ul>
        <li
          v-for="hero in superheroes"
          :key="hero.id">
          {{ hero.name }}

          <img :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`" alt="">
        </li>
      </ul>

      <button @click="getMoreHeroes">
        Show More
      </button>

      <p v-html="attribution" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['superheroes', 'loading', 'attribution'])
  },
  methods: {
    getMoreHeroes() {
      this.$store.dispatch('getMoreHeroes')
    }
  },
  mounted() {
    this.$store.dispatch('getSuperheroes')
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
</style>
