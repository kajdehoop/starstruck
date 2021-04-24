<template>
  <div class="artists">
    <searchbar />

    <div class="artist-cards">
      <artist v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>

    <p v-if="!artists.length > 0" class="error-message">
      No artists found
    </p>
  </div>
</template>

<script>

export default {
  computed: {
    artists () {
      return this.$store.getters.getArtistsByQuery;
    }
  },
};
</script>

<style lang="scss" scoped>
  .artist-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
