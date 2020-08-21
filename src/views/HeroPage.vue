<template>
  <div v-if="hero">
    <h1>{{ hero.name }}</h1>

    <p v-if="hero.description">{{ hero.description }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['hero'])
  },
  mounted() {
    this.$store.dispatch('getHero', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

</style>
