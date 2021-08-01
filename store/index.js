import axios from 'axios'

export const state = () => ({
  lists: [],
  images: []
})

export const mutations = {
  addUsers(state, lists) {
    state.lists = lists
  },
  addImages(state, images) {
    state.images = images
  }
}

export const actions = {
  async getBreedsList({commit}) {
    return await axios.get('https://dog.ceo/api/breeds/list/all')
    .then(res => {commit('addUsers', res.data.message)})
  },
  async fetchBreed({commit}, data) {
    return await axios.get(`https://dog.ceo/api/breed/${data}/images/random/8`)
    .then(res => {commit('addImages', res.data.message)})
  },
}
