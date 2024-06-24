<template>
  <div class="search-results">
     <!-- 显示Home.vue中的内容 -->
     <Home />
      <router-view></router-view>
    <div v-if="loading">
      <!-- 此处可以用加载图片代替 居中  <img src="loading.gif" alt="Loading...">-->
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error-message">
      <p>Error: {{ error }}</p>
    </div>
    <div v-if="products">
     
        <!-- 食物产品详细信息 -->
        <div v-for="product in products" :key="product.code" class="product">
        <!-- Food product image -->
        <div class="product-image-container">
          <img :src="product.image_front_url" :alt="product.product_name" class="product-image"/>
        </div>
        <!-- Food product info -->
        <div class="product-info">
        <!-- 出现的问题 就是v-for 它里面不能有除了{{ }}以外的东西，比如这种 <div>name:{{ product.product_name }}</div> 
        这会导致name：被渲染四次.好像也不是这个问题 我也不知道。我这么写：<div>{{ product.nova_group }}</div> 就只渲染一次，但是我得写name：就是名称啥的 -->
        <!-- 问题通常出现在每次v-for循环中，模板内部的计算会被重新执行，导致重复渲染。 -->
             <div>code: {{ product.code }}</div>
             <div>nova: {{ product.nova_group }}</div>
             <div>quantity: {{ product.product_quantity }}</div>
             <div>additives: {{ product.additives }}</div>
        </div>
      </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import Home from './Home.vue';//将Home.vue引入

export default {
  components: {
    Home
  },

  data() {
    return {
      searchQuery: '',
      products: [],
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
        this.products = response.data;
        
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
.product {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.product-image-container {
  flex: 1;
  max-width: 33.33%;
  padding-right: 10px;
  padding-top: 4px;
  padding-left:70px;
}

.product-image {
  width: 100%;
  height: auto;
}

.product-info {
  flex: 2;
  max-width: 66.67%;
}

.error-message {
  color: red;
}

@media (max-width: 768px) {
  .product {
    flex-direction: column;
  }

  .product-image-container, .product-info {
    max-width: 100%;
    padding-right: 0;
  }
}
</style>
