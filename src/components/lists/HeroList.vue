<template>
  <ul>
    <li v-for="hero in heroes" :key="hero.id">
      <router-link
        :to="{ name: 'Hero', params: { name: slugify(hero.name), id: hero.id} }"
        data-testid="hero-name">
        <div 
          :style="{backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})`}"
          class="hero-card">
          <div class="overlay"></div>
          <div class="body">
            <div class="name">
              {{ hero.name }}
            </div>
          </div>
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

li {
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}

.hero-card {
  min-height: 400px;
  position: relative;
  border-radius: $border-radius;
  background-position: center;
  background-size: cover;

  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    background: rgba($color: $blue-dark, $alpha: 0.3);
    border-radius: $border-radius;
  }

  .body {
    min-height: 400px;
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    position: relative;
    z-index: 5;

    .name {
      font-size: 3.125rem;
      margin: 0;
      letter-spacing: 2px;
      color: white;
      font-family: 'Bangers', 'Montserrat', sans-serif;
      text-shadow: 2px 2px 0px $blue-dark;
    }
  }
}
</style>
