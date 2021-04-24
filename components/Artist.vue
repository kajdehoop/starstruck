<template>
  <NuxtLink v-if="artistInfo" :to="`artist-detail/${artistInfo.id}?name=${artist.name}`">
    <vs-card type="2">
      <template #title>
        <h3>{{ artist.name }}</h3>
      </template>
      <template #img>
        <img :src="artistInfo ? artistInfo.images[1].url : ''" alt="artist-image">
      </template>
      <template #text>
        <p>
          {{ artistInfo ? artistInfo.genres.join(',') : '' }}
        </p>
      </template>
    </vs-card>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    artistInfo: null,
  }),
  mounted () {
    this.findArtistByName(this.artist.name);
  },
  methods: {
    async findArtistByName (artistName) {
      const response = await this.$axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&access_token=${this.$store.state.token}`);
      if (response.status === 200 && response.data.artists.items.length > 0) {
        this.artistInfo = response.data.artists.items[0]; // first result
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  ::v-deep .vs-card {
    width: 280px;
    height: 155px;
    margin: 10px;
  }
</style>
