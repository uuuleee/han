<template>
    <div class="page">
      <div class="header">
        <ul class="header-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Feedback</a></li>
          <li><a href="#">Help Center</a></li>
          <div class="auth-links">            
            <a href="#" @click="goToLogin">
                <img src="../assets/home/SignUp.png" alt="SignUp" class="SignUp" />
                Sign Up
            </a>            
            <a href="#" @click="goToLogin">
                <img src="../assets/home/SignIn.png" alt="SignIn" class="SignIn" />
                Sign In
            </a>
          </div>
        </ul>
      </div>
      <div class="home">
        <header class="navbar">
          <div class="navbar-container">
            <img src="../assets/home/icon1.png" alt="icon1" class="icon1" />
            <img src="../assets/home/Z4.png" alt="Z4" class="Z4" />
            <div class="search-bar">
              <input type="text" placeholder="Search food name" v-model="query" />
              <img src="../assets/home/search.png" alt="Search" class="search-icon" @click="search" />
            </div>
            
          <div class="right-section">           
            <a href="#" @click="goTocollect"> 
                <img src="../assets/home/collect1.png" alt="collect1" class="collect1" />
                Collect
            </a>           
            <a href="#" @click="goTobrowse">
                 <img src="../assets/home/browse1.png" alt="browse1" class="browse1" />
                 Browse History
            </a>
            
            <a href="#" @click="goTocommunity">
                <img src="../assets/home/community1.png" alt="community1" class="community1" />
                User Community
            </a>
          </div>
          </div>          
        </header>
      </div>
      <div class="green1">
        <img src="../assets/home/gs1.jpg " alt="green" class="green" />
        <a href="#" class="learn-more-btn" @click="learnMore">LEARN MORE</a>
      </div>

      <div class="mp">
        <header class="mpart">
          <div class="npart-container">
            <img src="../assets/home/divider1.png" alt="divider1" class="divider1" />
            <span class="recommended-text">Recommended for You</span>
            <img src="../assets/home/divider1.png" alt="divider1" class="divider1" />           
          </div>          
        </header>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: "Home",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    search() {
      console.log("Performing search:", this.query);
      // 在这里添加搜索逻辑，比如跳转到搜索结果页面
      // 例如：this.$router.push(`/search?q=${this.query}`);
    },
    goToLogin() {
      // 这里可以使用 Vue Router 或直接跳转到登录页面的逻辑
      console.log("跳转到登录页面");
      // window.location.href = '/login'; // 例如这样跳转
    },
    learnMore() {
      console.log("跳转到了解更多页面");
      // 在这里添加跳转到了解更多页面的逻辑
      // 例如：this.$router.push('/learn-more');
    },
  },
};
</script>
  
  <style scoped>
  /* 全局样式 */
  .page {
    font-family: Arial, sans-serif;
  }
  
  /* 导航栏样式 */
  .header {
    background-color: #ecc642;
    margin: 0;
    padding: 0;
  }
  
  .header-links {
    display: flex;
    justify-content: flex-start;
    list-style: none;
    margin: 0;
    padding: 0.7rem 2rem;
  }
  
  .header-links li {
    margin-left: 2rem;
  }
  /*登录注册*/
  .header-links a {  
    text-decoration: none;
    color: #333333;
    font-size: 1rem;
  }
  
  .header-links a:hover {
    text-decoration: underline;
   color: #4CAF50;
}
  

  .auth-links {
    display: flex;
    align-items: center;
    margin-left: auto; /* 将认证链接推到最右侧 */
  }
  
  .SignUp,
  .SignIn {
    width: 0.8rem; /* 调整图标大小 */
    height: auto;
    margin-left: 1rem; /* 调整图标左边的间距 */
    margin-right: 0.3rem;
  }
  
  
  /* 主页样式 */
  .home {
    margin: 0;
    padding: 0;
  }
  
  /* 导航栏样式 */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f7f5f5;
    padding: 0.1rem 2rem;
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .icon1 {
    width: 4%;
    height: auto;
    margin-left: 2rem; /* 调整图标的左侧边距 */
  }
  
  .Z4 {
    width: 15%;
    height: auto;
  }
  
  /* 搜索框样式 */
  .search-bar {
    display: flex;
    align-items: center;
    position: relative; /* 相对定位，以便搜索镜图标绝对定位 */
    width: 20%; /* 确保搜索栏占据整个宽度 */
  }
  
  .search-bar input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 30px;
    width: 100%; /* 调整输入框宽度 */
    padding-right: 2.5rem; /* 确保输入框内容不会覆盖图标 */
    box-sizing: border-box; /* 包括内边距和边框在内的宽度 */
  }
  
  /* 在这里自定义输入框聚焦时的样式 */
  .search-bar input:focus {
   border-color: #ccc; /* 在聚焦时保持边框颜色不变 */
   outline: none; /* 移除默认的聚焦样式 */
}
  .search-bar .search-icon {
    position: absolute;
    right: 1rem; /* 将搜索镜图标定位到输入框的最右侧 */
    cursor: pointer;
    width: 1rem; /* 调整搜索镜图标的大小 */
    height: auto;
  }
  
  .search-bar .search-icon:hover {
    opacity: 0.7; /* 悬停时降低不透明度 */
  }
 
  .right-section {
  display: flex;
  align-items: center;
  margin-left: 14rem;
}

.right-section a {
  text-decoration: none;
  color: #333333;
  font-size: 1.1rem;
  
}
.right-section a:hover {
  text-decoration: underline;
  color: #4CAF50;
}


  .collect1{
    width: 1rem; /* 调整图标大小 */
    height: auto;
    margin-right: 0.4rem;  
  }
  .browse1{
    width: 1rem; /* 调整图标大小 */
    height: auto;
    margin-left: 2.2rem; /* 调整图标之间的间距 */
    margin-right: 0.4rem;  
  }
  .community1 {
    width: 1rem; /* 调整图标大小 */
    height: auto;
    margin-left: 2.11rem; /* 调整图标左边的间距 */
    margin-right: 0.4rem;  
   
  }
  .green1 {
  width: 100%; /* 确保父元素宽度占满 */
  height: auto; /* 高度自适应 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative; /* 相对定位，以便绝对定位按钮 */
}

.green1 .green {
  display: block; /* 确保图片作为块级元素 */
  width: 90%; /* 图片宽度占满父元素 */
  height: 35rem; /* 图片高度自适应 */
}
.learn-more-btn {
  position: absolute; /* 绝对定位 */
  bottom: 2rem; /* 距离底部的距离 */
  border: 2px solid #F8D86A;
  background-color: #D6BB38;
  color: #FFF100;
  padding: 0.5rem 3rem;
  border-radius: 1rem 0 1rem 0 ; /* 左上角和左下角有弧度 */
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.learn-more-btn:hover {
  background-color: #FFFFFF;
}

.mp{
    margin: 0;
    padding: 0;
  }

  .mpart {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 5rem; /* 根据需要调整高度 */
}

.npart-container {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.divider1 {
  width: 15rem; /* 调整图标大小 */ 
  margin-right:2rem;
  margin-left:2rem;
}
.recommended-text {
  font-weight: bold; /* 加粗 */
  font-size: 1rem; /* 增大字体 */
}
  </style>
  