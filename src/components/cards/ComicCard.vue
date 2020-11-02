<template>
  <div class="comic-card">
    <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="">

    <div class="info">
      <div v-if="comic.description" class="margin-m bottom">
        <p class="heading three margin-s bottom">Description</p>
        <p v-html="comic.description" />
      </div>

      <div v-if="comic.creators.items.length" class="margin-m bottom">
      <p class="heading three margin-s bottom">Creators</p>
      <ul >
        <li
          v-for="creator in comic.creators.items"
          :key="creator.name"
          data-testid="creators">
          <span>{{ creator.role }}:</span> {{ creator.name }}
        </li>
      </ul>
      </div>

      <p class="attr">Data provided by <a href="http://marvel.com">Marvel</a> <br>© 2020 MARVEL</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comic']
}
</script>
