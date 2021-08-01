<template>
  <div>
    <div class="select-form">
      <select class="custom-select" v-model="selected" @change="change">
        <option class="placeholder" :value="null" disabled>Select a dog breed</option>
        <option v-for="breed in breeds" :value="breed.value" :key="breed.value">
          {{ breed.text }}
        </option>
      </select>
    </div>
    <div class="photo-section">
      <div class="custom-row">
        <div class="custom-col" v-for="image in images" :key="image" alt="Dog Picture">
          <img :src="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      breeds: [],
      selected: null,
    }
  },
  computed: {
    ...mapState(['lists', 'images']),
  },
  mounted() {
    this.getBreedsList().then(res => this.breedsOption()).catch(e => {console.log(e)})
  },
  methods: {
    ...mapActions(['getBreedsList', 'fetchBreed']),
    breedsOption() {
      this.breeds = this.breeds.concat(Object.entries(this.lists).reduce((list, [breed, subbreeds]) => {
        if (subbreeds.length) {
          for (const subbreed of subbreeds) {
            list.push({"text": `${breed} ${subbreed}`, "value": `${breed}/${subbreed}`})
          }
        }
        else {
          list.push({"text": breed, "value": breed})
        }
        return list
      }, []))
    },
    change() {
      this.fetchBreed(this.selected).catch(e => {console.log(e)})
    }
  }
}
</script>
