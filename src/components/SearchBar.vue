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
          @input="$emit('input', $event.target.value)"
          id="search"
          type="search"
          autocomplete="off">
      </div>
      <input type="submit" value="Search">
    </div>
  </form>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: String, required: false }
  }
}
</script>
