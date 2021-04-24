import { uuid } from 'uuidv4';
import songsFallback from '../db-fallback/songs.json';
import artistsFallback from '../db-fallback/artists.json';

export const state = () => ({
  songs: [],
  artists: [],
  playlists: localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [],
  token: '',
  query: '',
  currentArtistName: null,
  currentPlaylistId: null,
});

export const mutations = {
  setArtists (state, artists) {
    state.artists = artists;
  },
  setSongs (state, songs) {
    state.songs = songs;
  },
  setToken (state, token) {
    state.token = token;
  },
  setQuery (state, query) {
    state.query = query;
  },
  setCurrentArtistName (state, currentArtistName) {
    state.currentArtistName = currentArtistName;
  },
  setCurrentPlaylistId (state, currentPlaylistId) {
    state.currentPlaylistId = currentPlaylistId;
  },
  addToPlaylist (state, { songId, playlistId }) {
    const playlist = state.playlists.find(x => x.id === playlistId);
    if (playlist && !playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      this.commit('updateLocalStorage');
    }
  },
  removeFromPlaylist (state, { songId, playlistId }) {
    const playlist = state.playlists.find(x => x.id === playlistId);
    if (playlist) {
      const index = playlist.songs.indexOf(songId);
      if (index > -1) {
        playlist.songs.splice(index, 1);
        this.commit('updateLocalStorage');
      }
    }
  },
  addPlaylist (state, playlist) {
    if (!state.playlists.find(x => x.id === playlist.id)) {
      state.playlists.push(playlist);
      this.commit('updateLocalStorage');
    }
  },
  removePlaylist (state, playlistId) {
    state.playlists = state.playlists.filter(playlist => playlist.id !== playlistId);
    this.commit('updateLocalStorage');
  },
  updateLocalStorage (state) {
    localStorage.setItem('playlists', JSON.stringify(state.playlists));
  }
};

export const actions = {
  fetchSongs () {
    this.$axios.get('http://localhost:3001/songs').then((response) => {
      this.commit('setSongs', response.data);
    }).catch(() => {
      this.commit('setSongs', songsFallback);
    });
  },
  fetchArtists () {
    this.$axios.get('http://localhost:3001/artists').then((response) => {
      this.commit('setArtists', response.data);
    }).catch(() => {
      this.commit('setArtists', artistsFallback);
    });
  },
  updateQuery ({ state }, query) {
    this.commit('setQuery', query);
  },
  updateCurrentArtistName ({ state }, name) {
    this.commit('setCurrentArtistName', name);
  },
  updateCurrentPlaylistId ({ state }, id) {
    this.commit('setCurrentPlaylistId', id);
  },
  async refreshToken ({ state }) {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', '43d8992c63f5475ea47c91a3732bdc7b');
    params.append('client_secret', '4827a2a41c184c45a00a2ed683c577f7');
    const response = await this.$axios.post('https://accounts.spotify.com/api/token', params);

    if (response.status === 200) {
      await this.commit('setToken', response.data.access_token);
      console.log('Spotify token has been set', this.state.token);
    } else {
      console.log('no Spotify token received');
    }
  },
  createPlaylist ({ state }, name) {
    const playlist = {
      id: uuid(),
      name,
      songs: [],
    };
    this.commit('addPlaylist', playlist);
  },
  removePlaylist ({ state }, playlistId) {
    this.commit('removePlaylist', playlistId);
  },
  addSongToPlaylist ({ state }, { songId, playlistId }) {
    this.commit('addToPlaylist', { songId, playlistId });
  },
  removeSongFromPlaylist ({ state }, { songId, playlistId }) {
    this.commit('removeFromPlaylist', { songId, playlistId });
  },
};

export const getters = {
  getSongsByCurrentArtist (state) {
    return state.songs.filter((song) => {
      const artistName = song.artist.replace(/[^a-zA-Z0-9 ]/g, '');
      const currentArtistName = state.currentArtistName.replace(/[^a-zA-Z0-9 ]/g, '');

      return artistName === currentArtistName;
    });
  },
  getArtistsByQuery (state) {
    return state.artists.filter((artist) => {
      const artistName = artist.name.toLowerCase();
      const query = state.query.toLowerCase();

      return artistName.includes(query);
    }).slice(0, 15);
  },
  getAllPlaylists (state) {
    return state.playlists;
  },
  getCurrentPlaylist (state) {
    return state.playlists.find(playlist => playlist.id === state.currentPlaylistId);
  },
  getSongsInCurrentPlaylist (state, getters) {
    const songIds = getters.getCurrentPlaylist ? getters.getCurrentPlaylist.songs : [];

    return state.songs.filter(song => songIds.includes(song.id));
  }
};
