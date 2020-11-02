<template>
  <div class="hero-card">
    <img
      :src="`${hero.info.thumbnail.path}.${hero.info.thumbnail.extension}`"
      alt=""
      class="img margin-s bottom">

    <div v-if="hero.info.description" class="bio margin-m bottom text">
      <p class="heading three margin-s bottom">Biography</p>
      <p data-testid="description">{{ hero.info.description }}</p>
    </div>

    <div v-if="hero.info.urls.length" class="stats margin-m bottom text">
      <p class="heading three margin-s bottom">Stats</p>
      
      <ul>
        <li>Total Comics: {{ hero.info.comics.available }}</li>
        <li>Total Series: {{ hero.info.series.available }}</li>
        <li>Total Events: {{ hero.info.events.available }}</li>
        <li>Total Stories: {{ hero.info.stories.available }}</li>
      </ul>
    </div>

    <p class="attr text margin-s bottom">Data provided by <a href="http://marvel.com">Marvel</a> <br>© 2020 MARVEL</p>
  </div>
</template>

<script>
export default {
  props: ['hero']
}
</script>
