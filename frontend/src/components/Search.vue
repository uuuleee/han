<template>
  <div class="search-results">
    <h1>Search Results for "{{ searchQuery }}"</h1>

    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error-message">
      <p>Error: {{ error }}</p>
    </div>
    <div v-if="product">
      <div v-if="imageUrl">
        <h3>Product Image:</h3>
        <img :src="imageUrl" alt="Product Image" />
      </div>
      <h3>Product Information:</h3>
      <pre>{{ product }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      product: null,
      imageUrl: null,
      loading: false,
      error: null,
    };
  },
  created() {
    this.searchQuery = this.$route.query.q || '';
    if (this.searchQuery) {
      this.search();
    }
  },
  methods: {
    async search() {
      this.loading = true;
      this.error = null;
  
      try {
        const response = await axios.get(`http://localhost:3000/api/product/${this.searchQuery}`);
        this.product = response.data;

        // 获取产品照片
        const imageResponse = await axios.get(`http://localhost:3000/api/product/${this.searchQuery}/image`);
        this.imageUrl = imageResponse.data.imageUrl;
      } catch (error) {
        console.error('Error:', error.response);
        this.error = 'Failed to fetch product information: ' + (error.response ? error.response.data.error : error.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
