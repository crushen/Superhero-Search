<template>
  <ul>
    <li
      v-for="hero in list"
      :key="hero.id">
      
      <hero-card :hero="hero" class="hero-card" />
    </li>
  </ul>
</template>

<script>
import heroCard from '@/components/cards/HeroCard'

export default {
  props: {
    list: { required: true, type: Array }
  },
  components: {
    heroCard
  }
}
</script>

<style lang="scss" scoped>

</style>
