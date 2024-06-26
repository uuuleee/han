<template>
  <div class="search-results">
     <!-- 显示Nav.vue中的内容 -->
     <Nav />
      <router-view></router-view>
  </div>
  <div>
    <div v-if="loading">
      <!-- 此处可以用加载图片代替 居中  <img src="loading.gif" alt="Loading...">-->
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error-message">
      <p>Error: {{ error }}</p>
    </div>

    <div v-if="responseData" class="product">
      <!-- Food product image -->
      <div class="product-image-container">
          <img :src="responseData.image_front_url" :alt="responseData.product_name" class="product-image"/>
      </div>
      
        <!-- Food product info -->
        <div class="product-info">
          <p>Barcode: {{ responseData.code }}</p>
          <!-- 
             <p>Nova: {{ product.nova_group }}</p>
             <p>Quantity: {{ product.product_quantity }}</p>
             <p>Additives: {{ product.additives_tags }}</p>
             <p>Eco grade: {{ product.ecoscore_grade }}</p>
             <p>Food groups: {{ product.food_groups }}</p>
             <p>code: {{ product.nutriments }}</p>
             <p>image_nutrition_url: {{ product.nutrient_levels }}</p>
             <p>nutriscore_grade: {{ product.nutriscore_grade}}</p>
             <p>  nutriscore_score {{ product.  nutriscore_score}}</p>
             <p>origin: {{ product.origin}}</p>
             <p>nova_groups_markers: {{ product.nova_groups_markers}}</p>
             <p>traces_from_ingredients: {{ product.traces_from_ingredients}}</p>    
         -->       
     </div>  

</div>
<div v-if="responsePanel" class="knowledge-panels">
  <!-- 添加剂 -->
    <div v-if="responsePanel.additives">
         <div>Additives</div>
         <!-- 遍历 additives 中的 elements 数组 -->
        <div v-for="(element, index) in responsePanel.additives.elements" :key="index">
            <h2>{{ responsePanel[element.panel_element.panel_id].title_element.title }}</h2>
            <div v-html="responsePanel[element.panel_element.panel_id].elements[0].text_element.html"></div>
        </div>
    </div>
</div>


  <!-- <div v-if="responsePanel" class="knowledge-panels">
      <div v-for="(panel) in responsePanel" :key="panel"   
      class="panel">
        <h2>{{ panel.title_element?.title }}</h2>
        <div v-for="(element, index) in panel.elements" :key="index">
          <div v-if="element.element_type === 'text'" v-html="element.text_element.html"></div>
          <div v-else-if="element.element_type === 'image'">
          <img :src="element.image_element.url" :alt="element.image_element.alt || 'Image'" />
        </div>
        <div v-else-if="element.element_type === 'table'">
          <table>
            <thead>
              <tr>
                <th v-for="column in element.table_element.columns" :key="column.text">{{ column.text }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in element.table_element.rows" :key="row.id">
                <td v-for="value in row.values" :key="value.text">
                  <img v-if="value.icon_url" :src="value.icon_url" :alt="value.text" />
                  <span v-else>{{ value.text }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div> -->
 
  </div>
</template>

<script>
import axios from 'axios';
import Nav from './Nav.vue';


export default {
  components: {
    Nav
  },

  data() {
    return {
      searchQuery: '',
      responseData: {} ,
      responsePanel:{},
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
    // 获取产品信息
    const response = await axios.get(`http://localhost:3000/api/product/${this.searchQuery}`);

    this.responseData = response.data.product;
    console.log(this.responseData);

      //获取knowledge panels信息
      const panelResponse = await axios.get(`https://world.openfoodfacts.net/api/v2/product/${this.searchQuery}?fields=knowledge_panels`);
      this.responsePanel = panelResponse.data.product.knowledge_panels;
      console.log(this.responsePanel);
    // const panelResponse = await axios.get(`http://localhost:3000/api/product/${this.searchQuery}?fields=knowledge_panels`);
    // this.responsePanel = panelResponse.data;
   

    
  } catch (error) {
    console.error('Error:', error.response);
    this.error = 'Failed to fetch product information: ' + (error.response ? error.response.data.error : error.message);
  } finally {
    this.loading = false;
  }
},

  


   
  }
};
</script>

<style scoped>

  

.product{
  display: flex;
  border: 3px solid red;
  
}

.product-image-container {
  flex: 1; /* 占据父容器的1/3宽度 */
}

.product-info {
  flex: 2; /* 占据父容器的2/3宽度 */
  padding-left: 20px; /* 可选：为了增加图片和文字之间的间距 */
}

.product-image {
  width: 100%; /* 图片宽度填充其容器 */
  height: auto; /* 根据比例调整高度 */
}

.error-message {
  color: red;
}
.knowledge-panels{
  border: 3px solid red;
  padding:30px;
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
