<template>
  <ul>
    <li v-for="hero in heroes" :key="hero.id" class="hero-list-card">
      <router-link
        :to="{ name: 'Hero', params: { name: slugify(hero.name), id: hero.id} }"
        data-testid="hero-name">
        <img :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`" alt="">

        <div class="text">
          <p class="description heading four">{{ hero.name }}</p>
          <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { slugify } from '@/mixins/slugify'

export default {
  props: ['heroes'],
  methods: {
    slugify
  }
}
</script>
