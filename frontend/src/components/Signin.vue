<template>
    <div class="singin-container">      
      <!-- 登录 -->
     <div class="slider">
        <div :class="active === 1 ? 'form' : 'form hidden'">
       <div class="title">欢迎回来</div>
       <div class="subtitle">登录你的账户</div>
       <div class="inputf">       
         <input type="text" v-model="loginData.username" placeholder="用户名"/>  
         <span class="lable">用户名</span>
       </div>
       <div class="inputf">
         <input type="text"  v-model="loginData.password" placeholder="密码"/>
          <span class="lable">密码</span>
       </div>
       <button @click="login">登录</button>
     </div>
     <!-- 注册 -->
     <div :class="active === 2 ? 'form' : 'form hidden'">
          <div class="title">开始</div>
          <div class="subtitle">创建你的账户</div>
          <div class="inputf">
            <input v-model="registerData.username" type="text" placeholder="用户名"/>
             <span class="lable">用户名</span>
          </div>
          <div class="inputf">
            <input v-model="registerData.email" type="text" placeholder="邮箱"/>
             <span class="lable">邮箱</span>
          </div>
          <div class="inputf">
            <input v-model="registerData.password" type="password" placeholder="密码"/>
             <span class="lable">密码</span>
          </div>
          <button @click="register">注册</button>
        </div>
        <div :class="active === 1 ? 'card': 'card active'">
          <div class="head">
            <div class="name">Nutri<span>Check</span></div>
          </div>
          <div class="desc">啦啦啦啦nih niihgfutf啦啦啦</div>
          <div class="btn">
            {{ active === 1 ?'新用户?' :'已有账号'}}
            <button @click="toggleForm">
                {{ active === 1 ?'去注册?' :'去登录'}}
            </button>
          </div>
        </div>
     </div>
    </div>         
 </template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';// 从 vue-router 中导入 useRouter 函数

const active = ref(1);
const loginData = ref({ username: '', password: '' });
const registerData = ref({ username: '', email: '', password: '' });
const router = useRouter();
const toggleForm = () => {
  active.value = active.value === 1 ? 2 : 1;
};

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', loginData.value);
    console.log("Log in ",response.data);
    
    
    alert('登录成功');
      // 跳转到主页
      router.push({ path: '/' });
  } catch (error) {
    console.error('Login error:', error);
    alert('登录失败');
  }
};

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', registerData.value);
    console.log("Sign up ",response.data);
    
    alert('注册成功');
      // 跳转到主页
      router.push({ path: '/' });
  } catch (error) {
    console.error('Register error:', error);
    alert('注册失败');
  }
};
</script>
  
 <style lang="scss">
 .singin-container{
 width:100%;
 min-height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
 background:url("../assets/signin/hai.jpg") no-repeat center center;
 background-size: cover;
 .slider{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .form{
    width: 400px;/*这里有问题*/
    height:500px;
    background: rgba(17,25,40,0.75);
    backdrop-filter: blur(16px) saturate(0);
    border-radius: 10px;
    border:1px solid rgba(255,255,255,0.15);
    padding: 40px 60px;
    box-shadow: rgba(50,50,93,0.25) 50px 50px 100px -20px,
                rgba(0,0,0,0.5) 30px 30px 60px -30px
                rgba(212,217,222,0.35) 2px -2px 6px 0px inset; 
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 10px;
    z-index:3;
    transition: 0.25s ease-in-out;

    &.hidden{
         height: 395px;
         box-shadow: none;
         z-index:1;
    }  

    .title{
      font-size: 18px;
      color:rgb(246,240,255);
      letter-spacing: 1px;
      font-weight: 300;
    }
    .subtitle{
        font-size: 11px;
        color:rgb(246,240,255);
        letter-spacing: 1px;
        margin-bottom: 35px;
    }
    .inputf{
        width:100%;
        position: relative;
        margin-bottom: 35px;
        input{
            width:100%;
            height:35px;
            border:none;
            outline: 1.5px solid rgb(200,200,220);
            background: transparent;
            border-radius: 8px;
            font-size: 12px;
            padding:0 15px;
            color:rgb(246,249,255);
            &::placeholder{
                color:rgb(175,180,190);
            }
            &:focus {
              outline:1.5px solid rgb(224,229,240);
              &::placeholder{
                opacity: 0;
              }
              & + .lable{
                opacity: 1;
                top:-20px;
              } 
            }
            &:not(:placeholder-shown) + .lable {
                opacity: 1;
                top:-20px;
            }         
        }
        .lable{
            position: absolute;
            top:0;
            left:0;
            color:rgb(246,249,255);
            font-size: 11px;
            font-weight: bold;
            transition: 0.25s ease-out;
            opacity: 0;
        }
    }
    button{
        width: 100%;
        height: 35px;
        background: rgb(36,217,127);
        color: #ffffff;
        border: none;
        outline: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
    }    
    }
    .card{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0,-50%);
        width: 430px;
        height: 400px;
        background: url("../assets/signin/animals1.png") white;
        background-size: contain;
        padding: 60px;  /*他写的是40 */
        border-radius: 0 10px 10px 0;
        transition: 0.5s ease-in-out;
        z-index:2;
        &.active{
            right: calc(100% - 550px);/*他写的-440 */
            border-radius: 10px 0 0 10px;
            
        }
        .head{
            font-size:34px ;
            margin-bottom: 35px;
            .name{
                font-weight: 300;
             span{
                color:rgb(36,217,127);
                font-size: bold;
                }
            }
        }
        .desc{
            font-size: 14px;
            text-align: justify;
            margin-bottom: 35px;
        }
        .btn{
            font-size: 14px;
            button{
                background: rgb(36,217,127);
                font-size: 14px;
                padding: 5px 15px;
                border:none;
                outline: none;
                border-radius: 5px;
                cursor:pointer;
                margin-left: 10px;
            }
        }
    } 
 }
   
}
</style>
