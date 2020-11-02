<template>
  <ul>
    <li v-for="comic in comics" :key="comic.id" class="comic-card">
      <router-link
        :to="{ name: 'Comic', params: { id: comic.id } }"
        data-testid="comic-name">
        <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">

        <div class="text">
          <p class="description heading four">{{ comic.title }}</p>
          <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['comics']
}
