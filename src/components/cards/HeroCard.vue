<template>
  <div 
    :style="{backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})`}"
    class="card">
    <div class="overlay"></div>
    <div class="body">
      <div class="name">
        <p>{{ hero.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hero: { required: true, type: Object }
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