<template>
  <div v-if="track" class="song">
    <div class="left">
      <p>{{ track.name }}</p>
      <audio v-if="track.preview_url" controls>
        <source :src="track.preview_url" type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio>
      <p v-else class="preview-error">
        No song preview available
      </p>
    </div>
    <div v-if="canAddToPlaylist" class="right">
      <vs-button
        square
        icon
        class="add-btn"
        @click="$refs.addToPlaylistModal.open()"
      >
        <i class="bx bx-heart" />
      </vs-button>
      <add-to-playlist-modal
        ref="addToPlaylistModal"
        :song-id="songId"
        :song-name="track.name"
      />
    </div>
    <div v-if="canRemoveFromPlaylist" class="right">
      <vs-button
        square
        icon
        class="add-btn"
        @click="removeFromPlaylist"
      >
        <i class="bx bx-x" />
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trackId: {
      type: String,
      required: true,
    },
    songId: {
      type: Number,
      required: true,
    },
    playlistId: {
      type: String,
      default: null,
    },
    canAddToPlaylist: {
      type: Boolean,
      default: false,
    },
    canRemoveFromPlaylist: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    track: null,
  }),
  mounted () {
    this.findTrackById(this.trackId);
  },
  methods: {
    async findTrackById (trackId) {
      const response = await this.$axios.get(`https://api.spotify.com/v1/tracks/${trackId}?access_token=${this.$store.state.token}`);
      if (response.status === 200) {
        this.track = response.data;
      }
    },
    async removeFromPlaylist () {
      await this.$store.dispatch('removeSongFromPlaylist', { songId: this.songId, playlistId: this.playlistId });

      this.$vs.notification({
        duration: 3000,
        square: true,
        color: '#232323',
        progress: 'auto',
        title: 'Song successfully removed!',
        text: `The song ${this.track.name} has been removed from this playlist`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .song {
    padding: 15px;
    background: #232323;
    color: white;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    p{
      margin-bottom: 10px;
    }
    .preview-error {
      color: #979797;
    }
    audio::-webkit-media-controls-panel {
      background: white;
    }
  }
  @media only screen and (max-width: 600px) {
    .song {
      flex-direction: column;
      .add-btn {
        margin: 0 auto;
        margin-top: 5px;
      }
    }
  }
</style>
