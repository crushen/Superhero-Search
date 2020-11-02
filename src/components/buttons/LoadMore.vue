<template>
  <div class="container">
    <button
      @click="$emit('load-more')"
      :disabled="noMoreResults">
      {{ buttonText }}
    </button>
  </div>

</template>

<script>
export default {
  props: ['noMoreResults', 'text'],
  computed: {
    buttonText() {
      if(this.noMoreResults) {
        return 'No More Results'
      } else {
        return this.text
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.container {
  width: 100%;
  text-align: center;

  button {
    min-width: 100px;
    height: 40px;
    padding: 0 1rem;
    background: $orange;
    color: $light-font;
    border-radius: $border-radius;
    font-weight: 600;

    &:disabled {
      background: $med-font;
    }
  }
}
</style>
