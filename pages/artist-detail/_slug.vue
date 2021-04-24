<template>
  <div v-if="artistInfo">
    <NuxtLink to="/">
      <vs-button
        color="#232323"
        square
        icon
      >
        <i class="bx bx-left-arrow-alt" />
      </vs-button>
    </NuxtLink>
    <div class="details">
      <img :src="artistInfo.images[1].url" alt="artist-image"/>
      <h1>{{ artistInfo.name }}</h1>
      <h3>Songs by this artist:</h3>
      <div class="songs">
        <song
          v-for="song in songs"
          :key="song.id"
          :song-id="song.id"
          :track-id="song.spotifyId"
          can-add-to-playlist
        />
        <p v-if="songs.length === 0" class="error-message">
          No songs found for this artist
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  asyncData ({ params }) {
    const slug = params.slug;
    return { slug };
  },
  data: () => ({
    artistInfo: null,
  }),
  computed: {
    songs () {
      return this.$store.getters.getSongsByCurrentArtist;
    },
  },
  mounted () {
    this.findArtistById(this.slug);
    this.$store.dispatch('updateCurrentArtistName', this.$route.query.name);
  },
  methods: {
    async findArtistById (artistId) {
      const response = await this.$axios.get(`https://api.spotify.com/v1/artists/${artistId}?access_token=${this.$store.state.token}`);
      if (response.status === 200) {
        this.artistInfo = response.data;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .vs-button {
    margin: 0;
  }
  .details {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      max-width: 500px;
      width: 100%;
      margin-bottom: 10px;
      border: 9px solid #232323;
    }
    .songs {
      padding-top: 20px;
      padding-bottom: 20px;
      width: 100%;
      max-width: 500px;
    }
  }
</style>
