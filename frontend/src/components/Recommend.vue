<template>
   <div class="container-lunbo">
      <div class="img_box">
        <template v-for="(item,index) in img_arr" :key="index">
          <Transition :name="dir">
           <img :src="item" v-show="index===show_index"/>       
          </Transition>
        </template>
      </div>
      <button class="last_btn" @click="last_img" >&lt;&lt;</button>
      <button class="next_btn" v-on:click="next_img">&gt;&gt;</button>
      <div class="circle_box">
        <template v-for="(item,index) in img_arr" :key="index">
         <div>
          <span class="circle":class="{active:index===show_index}" @click="change_img(index)"> 
  
          </span> 
         </div>    
        </template>
      </div>
       <!-- div2: 空白的div -->
     <div class="div2">
        <!-- Adjust height as needed -->
      </div>
  
      <!-- div3: 存放商品模块 -->
      <div class="div3">
        <div class="container-products">
          <div class="product-row" v-for="row in 3" :key="row">
            <div class="product-col" v-for="col in 4" :key="(row - 1) * 4 + col">
              <!-- 商品信息，这里只是示例 -->
              Product {{ (row - 1) * 5 + col + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        show_index: 0,
        dir: 'next',
        img_arr: [
          'src/assets/home/bk1.jpg',
          'src/assets/home/bk2.jpg',
          'src/assets/home/bk4.jpg'
        ],
        timer: null,
        timer_delay: null
      };
    },
  
    methods: {
      next_img() {
        this.dir = 'next';
        clearInterval(this.timer);
        clearTimeout(this.timer_delay);
        this.show_index = this.show_index === 2 ? 0 : this.show_index + 1;
        this.timer_delay = setTimeout(() => {
          this.timer = this.timer_start();
        }, 5000);
      },
  
      last_img() {
        this.dir = 'last';
        clearInterval(this.timer);
        clearTimeout(this.timer_delay);
        this.show_index = this.show_index === 0 ? 2 : this.show_index - 1;
        this.timer_delay = setTimeout(() => {
          this.timer = this.timer_start();
        }, 5000);
      },
  
      timer_start() {
        this.dir = 'next';
        return setInterval(() => {
          this.show_index = this.show_index === 2 ? 0 : this.show_index + 1;
        }, 2000);
      },
  
      change_img(index) {
        clearInterval(this.timer);
        clearTimeout(this.timer_delay);
        this.dir = index > this.show_index ? 'next' : 'last';
        this.show_index = index;
        this.timer_delay = setTimeout(() => {
          this.timer = this.timer_start();
        }, 5000);
      }
    },
  
    mounted() {
      // 初始化定时器
      this.timer = this.timer_start();
    }
  };
</script>
<style>

  /*第三行 */
  .container-lunbo{
    width:100%;
    height:35vw;
    margin:0 auto;
    position: relative;
  }
  .img_box{
    width:100%;
    height:100%;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }
  .img_box img{
    height: 100%;
    width:100%;
    position: absolute;
  
  }
  /*Transition 那里的样式，切换图片时淡入淡出 */
  .next-enter-active,
  .next-leave-active{
    transition: transform 0.5s ease;
  }
  
  .next-enter-from{
    transform: translateX(100%);
  }
  .next-leave-to{
    transform: translateX(-100%);
  }
  
  .last-enter-active,
  .last-leave-active{
    transition: transform 0.5s ease;
  }
  
  .last-enter-from{
    transform: translateX(-100%);
  }
  .last-leave-to{
    transform: translateX(100%);
  }
  .last_btn{
    position: absolute;
    top:30%;
    transform: translateY(-50%);
    left:5px;
    width:40px;
    height:40px;
    border-radius: 50%;
    border:0;
    opacity: 0.7;
    cursor: pointer;
  }
  .next_btn{
    position: absolute;
    top:30%;
    transform: translateY(-50%);
    right:5px;
    width:40px;
    height:40px;
    border-radius: 50%;
    border:0;
    opacity: 0.7;
    cursor: pointer;
  }
  .last_btn:hover,.next_btn:hover{
    opacity: 1;
  }
  /*图片小圆点的位置*/
  .circle_box{
    display: flex;
    justify-content: center;
    position: absolute;
    top: 38%;
    transform: translateX(-50%);
    left:50%;
  }
  span.circle{
    display: block;
    width: 20px;  /*图片上小圆点的尺寸*/
    height: 20px;
    border-radius: 10px;
    background-color: gray;
    opacity: 0.5;
    margin:0 auto;
    transition:width 0.5s linear;
    cursor: pointer;
  }
  span.circle.active{
     width:35px;
     transition:width 0.5s linear;
  }
  .circle_box div{
    width:35px;
    height: 20px;
    
  }
  .div2 {
    flex: 1; 
    background-color: #f0f0f0; 
   
  }
  
  .div3 {
  position: absolute;
  top: 55%; 
  /* left: 50%; 
  transform: translate(-50%);
  width: 97%;    */
  /* background-color: rgba(255, 255, 255, 0.5); */
  width: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  /* border: 1px solid #ccc;  */
  padding: 5px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  z-index: 2; 
}

.container-products {
  display: flex;
  flex-direction: column;
  padding:20px;
  padding-top: 0px;
}

.product-row {
  display: flex; /* 改为 flex 布局 */
  justify-content: space-between; /* 使子元素之间的空间均匀分布 */
  gap: 10px; 
  margin-bottom: 20px;
}

.product-col {
  background-color: #ffffff;
  /* border: 1px solid #ccc;  */
  height:20rem;
  padding: 20px; 
  margin-right:8px;
  flex: 1; /* 使每个子元素平分父容器的宽度 */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
  
  /* 媒体查询，调整搜索框和图标的宽度 */
  @media (max-width: 1200px) {
    .nav-links li {
      font-size: 1.1rem; /* 调整导航栏字体大小 */
    }
  
    .nav-link {
      font-size: 0.8rem; /* 调整认证链接字体大小 */
    }
  
    .SignUp,
    .SignIn {
      width: 0.6rem; /* 调整图标大小 */
    }
    .search-bar {
      width: 50%; /* 调整宽度 */
    }
  
    .icon1 {
      width: 3.8%; /* 调整图标大小 */
    }
  
    .Z4 {
      width: 16%; /* 调整图标大小 */
    }
    .right-section {
      margin-left: 3rem; /* 右侧对齐 */
    }
  
    .right-section a {
      font-size: 0.8rem; /* 调整字体大小 */
    }
  
    .collect1,
    .browse1,
    .community1 {
      width: 0.9rem; /* 调整图标大小 */
      margin-left: 0.5rem; /* 调整图标和文字之间的间距 */
      margin-right: 0.2rem;
    }
  }
  
  @media (max-width: 992px) {
    .nav-links li {
      font-size: 1rem; /* 调整导航栏字体大小 */
    }
  
    .nav-link {
      font-size: 0.8rem; /* 调整认证链接字体大小 */
    }
  
    .SignUp,
    .SignIn {
      width: 0.6rem; /* 调整图标大小 */
    }
    .search-bar {
      width: 50%; /* 调整宽度 */
    }
  
    .icon1 {
      width: 3.5%; /* 调整图标大小 */
    }
  
    .Z4 {
      width: 18%; /* 调整图标大小 */
    }
    .right-section {
      margin-left: 1.5rem; /* 右侧对齐 */
    }
  
    .right-section a {
      font-size: 0.7rem; /* 调整字体大小 */
    }
  
    .collect1,
    .browse1,
    .community1 {
      width: 0.7rem; /* 调整图标大小 */
      margin-left: 0.5rem; /* 调整图标和文字之间的间距 */
      margin-right: 0.2rem;
    }
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none; /* 默认隐藏导航菜单 */
      flex-direction: column; /* 垂直排列 */
      background-color: white; /* 白色背景 */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
      position: absolute;
      left: 0; /* 控制下拉框的位置 */
      right: 0;
      border-radius: 4px; /* 圆角边框 */
      padding: 0.2rem 0; /* 内边距 */
      z-index: 1000;
      width: 50%; /* 下拉框宽度为导航栏的一半 */
    }
  
    .nav-links.show-menu {
      display: block; /* 显示菜单 */    
      top:5rem;
    }
  
    .menu-icon {
      display: block; /* 显示菜单图标 */
    }
  
    .nav-links li {
      padding: 0.1rem 0.5rem 0.2rem 1.6rem; /* 调下拉框内边距 */
      border-bottom: 1px solid #ccc; /* 下拉框添加分隔线 */  
  
    }
  
    .nav-links li:last-child {
      border-bottom: none; /* 最后一项无分隔线 */
    }
  
    .nav-link {
      font-size: 0.7rem; /* 调整认证链接字体大小 */
    }
  
    .SignUp,
    .SignIn {
      width: 0.6rem; /* 调整图标大小 */
    }
    .search-bar {
      width: 50%; /* 调整宽度 */
    }
  
    .icon1 {
      width: 4%; /* 调整图标大小 */
    }
  
    .Z4 {
      width: 19%; /* 调整图标大小 */
    }
  
    .search-bar input::placeholder {
      font-size: 0.7rem; /* 缩小时调整字体大小 */
    }
    .right-section {
      margin-left: 1.5rem; /* 右侧对齐 */
    }
  
    .right-section a {
      font-size: 0.6rem; /* 调整字体大小 */
    }
  
    .collect1,
    .browse1,
    .community1 {
      width: 0.6rem; /* 调整图标大小 */
      margin-left: 0.08rem; /* 调整图标和文字之间的间距 */
      margin-right: 0.15rem;
    }
  }
  
  @media (max-width: 540px) {
    .nav-links {
      display: none; /* 默认隐藏导航菜单 */
      flex-direction: column; /* 垂直排列 */
      background-color: white; /* 白色背景 */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
      position: absolute;
      left: 0; /* 控制下拉框的位置 */
      right: 0;
      border-radius: 4px; /* 圆角边框 */
      padding: 0.2rem 0; /* 内边距 */
      z-index: 1000;
      width: 50%; /* 下拉框宽度为导航栏的一半 */
    }
  
    .nav-links.show-menu {
      display: block; /* 显示菜单 */
      top:4rem;
    }
  
    .menu-icon {
      display: block; /* 显示菜单图标 */
    }
  
    .nav-links li {
      padding: 0.1rem 0.5rem 0.2rem 1.6rem; /* 调下拉框内边距 */
      border-bottom: 1px solid #ccc; /* 下拉框添加分隔线 */  
  
    }
  
    .nav-links li:last-child {
      border-bottom: none; /* 最后一项无分隔线 */
    }
  
    .nav-link {
      font-size: 0.6rem; /* 调整认证链接字体大小 */    
    }
  
    
    .SignIn {
      width: 0.5rem; /* 调整图标大小 */
      padding-left: 0.5rem;
    }
    .search-bar {
      width: 40%; /* 调整宽度 */
    }
  
    .icon1 {
      width: 7%; /* 调整图标大小 */
    }
  
    .Z4 {
      width: 25%; /* 调整图标大小 */
    }
  
    .search-bar input::placeholder {
      font-size: 0.6rem; /* 更小屏幕时进一步调整字体大小 */
    }
    .right-section {
      display: none; /* 隐藏右侧区域 */
    }
  
    .collect1,
    .browse1,
    .community1 {
      display: none; /* 隐藏相关图标 */
    }
  }


  </style>
  
  
  