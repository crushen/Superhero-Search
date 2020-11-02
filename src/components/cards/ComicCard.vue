<template>
  <div class="comic-card">
    <img
      :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
      alt=""
      class="img margin-s bottom">

    <div v-if="comic.description" class="desc margin-m bottom text">
      <p class="heading three margin-s bottom">Description</p>
      <p v-html="comic.description" />
    </div>

    <div v-if="comic.creators.items.length" class="creators margin-m bottom text">
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

    <p class="attr margin-s bottom text">Data provided by <a href="http://marvel.com">Marvel</a> <br>© 2020 MARVEL</p>
  </div>
</template>

<script>
export default {
  props: ['comic']
}
</script>
