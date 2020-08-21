<template>
  <div 
    :style="{backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})`}"
    class="card">
    <div class="overlay"></div>
    <div class="body">
      <div class="name">
        <router-link
          :to="{ name: 'HeroPage', params: { name: slugify(hero.name), id: hero.id} }">
          {{ hero.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hero: { required: true, type: Object }
  },
  methods: {
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, '')
      // Make the string lowercase
      str = str.toLowerCase()
      // Remove accents, swap ñ for n, etc
      var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
      var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }
      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '') 
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-') 
      // Collapse dashes
      .replace(/-+/g, '-')

      return str
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
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
    background: rgba($color: $background, $alpha: 0.3);
    border-radius: $border-radius;
  }

  .body {
    min-height: 400px;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    position: relative;
    z-index: 5;

    .name {
      font-size: 50px;
      margin: 0;
      letter-spacing: 2px;
      color: white;
      font-family: 'Bangers', 'Montserrat', sans-serif;
    }
  }
}
</style>