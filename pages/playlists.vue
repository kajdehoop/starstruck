<template>
  <div class="playlists">
    <playlist
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      can-remove
    />

    <p v-if="!playlists.length > 0" class="error-message">
      You don't have any playlists
    </p>

    <vs-button
      square
      icon
      class="create-btn"
      @click="$refs.newPlaylistModal.open()"
    >
      <i class="bx bx-plus" />
    </vs-button>
    <new-playlist-modal ref="newPlaylistModal" />
  </div>
</template>

<script>
import NewPlaylistModal from '../components/NewPlaylistModal';
import Playlist from '../components/Playlist';

export default {
  components: { Playlist, NewPlaylistModal },
  computed: {
    playlists () {
      return this.$store.getters.getAllPlaylists;
    }
  },
};
</script>

<style lang="scss" scoped>
  .create-btn {
    margin: 20px auto;
  }
</style>
