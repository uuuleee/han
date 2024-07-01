<template>
  <div class="search-results">
    <Nav />
    <router-view></router-view>
  </div>
  <div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error-message">
      <p>Error: {{ error }}</p>
    </div>
<div class="font-all">
    <div v-if="responseData" class="product">
      <!-- Food product image -->
      <div class="product-image-container">
        <img :src="responseData.image_front_url" :alt="responseData.product_name" class="product-image"/>
      </div>
      
      <!-- Food product info -->
      <div class="product-info">
        <p><strong>Product name: </strong>{{ responseData.product_name }}</p>
        <p><strong>Barcode:</strong> {{ responseData.code }}</p>
        <p><strong>Quantity:</strong> {{ responseData.quantity }}</p>
        <p><strong>Categories: </strong>{{ responseData.categories }}</p>
        <p><strong>Country of origin:</strong> {{ responseData.origin }}</p>
        <p><strong>Labels: </strong>{{ responseData.labels }}</p>
       
      </div>  
    </div>
<!-- <div></div>要想有边框要加这个 然后下面的div padding margin -->
    <div v-if="responsePanel" class="knowledge-panels">
      <!-- Additives -->
      <div v-if="responsePanel.additives">
        <div>Additives</div>
        <div v-for="(element, index) in responsePanel.additives.elements" :key="index">
          <h2>{{ responsePanel[element.panel_element.panel_id].title_element.title }}</h2>
          <div v-html="responsePanel[element.panel_element.panel_id].elements[0].text_element.html"></div>
        </div>
      </div>

      <!-- Carbon Footprint -->
      <div v-if="responsePanel.carbon_footprint">
        <div v-for="(topic, index) in responsePanel.carbon_footprint.topics" :key="index">
          <div>{{ topic }}</div>
        </div>
        <div v-for="(element, index) in responsePanel.carbon_footprint.elements" :key="index">
          <div v-if="element.element_type === 'text'">
            <div v-html="element.text_element.html"></div>
          </div>
          <div v-if="element.element_type === 'table'">
            <h3>{{ element.table_element.title }}</h3>
            <table>
              <thead>
                <tr>
                  <th v-for="(column, colIndex) in element.table_element.columns" :key="colIndex">
                    {{ column.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in element.table_element.rows" :key="rowIndex">
                  <td v-for="(value, valueIndex) in row.values" :key="valueIndex">
                    <img v-if="value.icon_url" :src="value.icon_url" alt="icon" />
                    {{ value.text }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Carbon Footprint Summary -->
      <div v-if="responsePanel.carbon_footprint.title_element">
        <img :src="responsePanel.carbon_footprint.title_element.icon_url" alt="icon" class="car-icon" />
        <h2>{{ responsePanel.carbon_footprint.title_element.title }}</h2>
        <p>{{ responsePanel.carbon_footprint.title_element.subtitle }}</p>
      </div>

   <div class="eco-score-container">
    <!-- Eco-Score Title and Icon -->
    <div class="eco-score-title">
      <img :src="responsePanel.ecoscore_total.title_element.icon_url" alt="Eco-Score Icon" />
      <h2>{{ responsePanel.ecoscore_total.title_element.title }}</h2>
      <p>{{ responsePanel.ecoscore_total.title_element.subtitle }}</p>
    </div>

    <!-- Panels for each Eco-Score section -->
    <div v-for="(element, index) in responsePanel.ecoscore.elements" :key="'element_' + index">
  <!-- Render text elements -->
  <div v-if="element.element_type === 'text'" class="eco-score-text">
    <p v-html="element.text_element.html"></p>
  </div>

  <!-- Render panel_group elements -->
  <div v-if="element.element_type === 'panel_group'" class="eco-score-panel">
    <h3>{{ element.panel_group_element.title }}</h3>
    <div v-for="(panelId, panelIndex) in element.panel_group_element.panel_ids" :key="'panel_id_' + panelIndex">
      <!-- Assuming panelId is an ID like 'ecoscore_agribalyse' -->
      <div v-if="responsePanel[panelId]">
        <!-- Check if panelId exists in responsePanel -->
        <div v-for="(item, itemIndex) in responsePanel[panelId].elements" :key="'item_' + itemIndex">
          <div v-if="item.element_type === 'text'" class="eco-score-text">
            <p v-html="item.text_element.html"></p>
          </div>
          <div v-else-if="item.element_type === 'table'" class="eco-score-table">
            <!-- Example for rendering a table -->
            <h4>{{ item.table_element.title }}</h4>
            <table>
              <thead>
                <tr>
                  <th v-for="(column, columnIndex) in item.table_element.columns" :key="'column_' + columnIndex">
                    {{ column.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in item.table_element.rows" :key="'row_' + rowIndex">
                  <td>{{ row.values[0].text }}</td>
                  <td>{{ row.values[1].text }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

</div>
    </div>
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
    
    // const response = await axios.get(`http://localhost:3000/api/products/${this.searchQuery}`);
    // this.responseData = response.data.product;
    // console.log(this.responseData);
    const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${this.searchQuery}`);
    this.responseData = response.data.product;
    console.log(this.responseData);
   
      //获取knowledge panels信息
      const panelResponse = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${this.searchQuery}?fields=knowledge_panels`);
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
}


   
  }
};
</script>

<style scoped>
.font-all{
 
    font-family: Arial, sans-serif; /* 将字体设置为 Arial */
  
}
.product{
  display: flex;
  border: 3px solid rgb(223, 245, 202);
 margin:30px;
 padding:30px;
 border-radius: 20px;
 box-shadow: 0 0 40px 10px rgba(208, 233, 184, 0.7); /* 淡绿色阴影，扩展到20px的模糊半径和10px的偏移量 */
}

.product-image-container {
  flex: 1; /* 占据父容器的1/3宽度 */
  margin-left: 5%;
}

.product-info {
  margin-left:2%;
  flex: 2; /* 占据父容器的2/3宽度 */
  padding-left: 20px; /* 可选：为了增加图片和文字之间的间距 */
  padding-right:6%;
  font-size: 1.2rem; 
}


.product-image {
  width: 94%; /* 图片宽度填充其容器 */
  height: auto; /* 根据比例调整高度 */
}

.error-message {
  color: rgb(129, 126, 126);
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
.car{
  border: 3px solid red;
  padding-top: 5%;
}

.car-icon{
width:32px;
}

/* 媒体查询，调整搜索框和图标的宽度 */
@media (max-width: 1200px) {
  
}
@media (max-width: 992px) {
}
@media (max-width: 768px) {
}
@media (max-width: 540px) {
}
</style>
