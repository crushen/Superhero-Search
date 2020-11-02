<template>
  <div class="hero-card">
    <img :src="`${hero.info.thumbnail.path}.${hero.info.thumbnail.extension}`" alt="">

    <div class="info">
      <div v-if="hero.info.description" class="margin-m bottom">
        <p class="heading three margin-s bottom">Biography</p>
        <p data-testid="description">{{ hero.info.description }}</p>
      </div>

      <div v-if="hero.info.urls.length" class="margin-m bottom">
        <p class="heading three margin-s bottom">Stats</p>
        
        <p>Total Comics: {{ hero.info.comics.available }}</p>
        <p>Total Series: {{ hero.info.series.available }}</p>
        <p>Total Events: {{ hero.info.events.available }}</p>
        <p>Total Stories: {{ hero.info.stories.available }}</p>
      </div>

      <p class="attr">Data provided by <a href="http://marvel.com">Marvel</a> <br>© 2020 MARVEL</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hero']
}
</script>
