<template>
  <form
    @submit.prevent="$emit('submit-search')"
    id="search"
    class="search-container">
    <label for="search" v-html="label" />
    <div class="search">
      <div class="input">
        <img src="@/assets/icons/search.svg" alt="">
        <input
          :value="value"
          @input="emitInput($event)"
          id="search"
          type="search"
          autocomplete="off"
          data-testid="search-input">
      </div>
      <input type="submit" value="Search">
    </div>
  </form>
</template>

<script>
export default {
  props: ['label', 'value'],
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
