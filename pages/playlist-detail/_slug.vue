<template>
  <div v-if="playlist" class="playlist-detail">
    <NuxtLink to="/playlists">
      <vs-button
        color="#232323"
        square
        icon
      >
        <i class="bx bx-left-arrow-alt" />
      </vs-button>
    </NuxtLink>
    <h2>{{ playlist.name }}</h2>
    <div class="songs">
      <song
        v-for="song in songs"
        :key="song.id"
        :song-id="song.id"
        :track-id="song.spotifyId"
        :playlist-id="playlist.id"
        can-remove-from-playlist
      />
      <p v-if="!songs.length > 0" class="error-message">
        This playlist doesn't contain any songs. Add songs to this playlist from the artist page
      </p>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ params }) {
    const slug = params.slug;
    return { slug };
  },
  computed: {
    playlist () {
      return this.$store.getters.getCurrentPlaylist;
    },
    songs () {
      return this.$store.getters.getSongsInCurrentPlaylist;
    },
  },
  mounted () {
    this.$store.dispatch('updateCurrentPlaylistId', this.slug);
  },
};
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .vs-button {
    margin: 0;
  }
  .songs {
    padding-top: 20px;
  }
  h2 {
    text-align: center;
  }
</style>
