<template>
  <div class="singin-container">
    <div class="slider">
      <!-- log in -->
      <div :class="active === 1 ? 'form' : 'form hidden'">
        <div class="title">NutriCheck</div>
        <div class="subtitle">Welcome to Login</div>
        <div class="inputf">
          <input
            type="text" v-model="loginData.username" placeholder="Username"
            @input="validateUsername1"  @blur="validateUsername1"          />
          <span class="lable">Username</span>
          <span v-if="usernameError1" class="error-message">{{ usernameError1 }}</span>
        </div>
        <div class="inputf">
          <input
            type="password" v-model="loginData.password" placeholder="Password"
            @input="checkPasswordEmpty1" @blur="checkPasswordEmpty1"/>
          <span class="lable">Password</span>
          <span v-if="passwordError1" class="error-message">{{ passwordError1 }}</span>
        </div>
        <button @click="login">Sign in</button>
      </div>
      <!-- sign up -->
      <div :class="active === 2 ? 'form' : 'form hidden'">
        <div class="title">NutriCheck</div>
        <div class="subtitle">Welcome to register</div>
        <div class="inputf">
          <input v-model="registerData.username" type="text" placeholder="Username"
          @input="validateUsername2"  @blur="validateUsername2" />
          <span class="lable">Username</span>
          <span v-if="usernameError2" class="error-message">{{ usernameError2 }}</span>
        </div>
        <div class="inputf">
          <input
            v-model="registerData.email" type="text"  placeholder="Email address"
            @input="validateEmail" @blur="validateEmail"/>
          <span class="lable">Email address</span>
          <span v-if="emailError2" class="error-message">{{ emailError2 }}</span>
        </div>
        <div class="inputf">
          <input v-model="registerData.password" type="password" placeholder="Password"
          @input="checkPasswordEmpty2" @blur="checkPasswordEmpty2"/>
          <span class="lable">Password</span>
          <span v-if="passwordError2" class="error-message">{{ passwordError2 }}</span>
        </div>
        <button @click="register">Register</button>
      </div>
      <div :class="active === 1 ? 'card' : 'card active'">
        <div class="head">
          <div class="name">
            Welcome to Nutri<span>Check</span>!
          </div>
        </div>
        <div class="desc">
          Explore the world of ultra-processed foods (UPF), learn about their backstories and ingredients. UPF can impact your health, and NutriCheck aims to help you better understand and identify these foods. By registering, you can set your dietary preferences, receive personalized health advice, and learn how to make more informed dietary choices. Join us on this journey to improve our health and quality of life!
        </div>
        <div class="btn">
          {{ active === 1 ? 'New User >' : 'Already have an account >' }}
          <button @click="toggleForm">{{ active === 1 ? 'Register' : 'Sign in' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';// 从 vue-router 中导入 useRouter 函数
const router = useRouter();
const active = ref(1);
const loginData = ref({ username: '', password: '' });
const registerData = ref({ username: '', email: '', password: '' });

const usernameError1 = ref('');
const passwordError1 = ref('');
const usernameError2 = ref('');
const passwordError2 = ref('');
const emailError2 = ref('');

const toggleForm = () => {
  active.value = active.value === 1 ? 2 : 1;
};

const validateUsername1 = () => {
  if (!loginData.value.username.trim()) {
    usernameError1.value = 'Username cannot be empty';
  } else {
    usernameError1.value = '';
  }
};

const checkPasswordEmpty1 = () => {
  if (!loginData.value.password.trim()) {
    passwordError1.value = 'Password cannot be empty';
  } else {
    passwordError1.value = '';
  }
};

const login = async () => {
  validateUsername1();
  checkPasswordEmpty1();

  if (!usernameError1.value && !passwordError1.value && loginData.value.username && loginData.value.password) {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', loginData.value);
      console.log(response.data);
      alert('登录成功');
         // 跳转到主页
         router.push({ path: '/' });
    } catch (error) {
      console.error('Login error:', error);
      alert('登录失败');
    }
  }
};

const validateUsername2 = () => {
  if (!registerData.value.username.trim()) {
    usernameError2.value = 'Username cannot be empty';
  } else {
    usernameError2.value = '';
  }
};
const validateEmail = () => {
  const value = registerData.value.email.trim();
  const validValue = value.replace(/[^a-zA-Z0-9@._-]/g, '');
  registerData.value.email = validValue;

  if (!value) {
    emailError2.value = 'Email address cannot be empty';
  } else {
    emailError2.value = '';
  }
};

const checkPasswordEmpty2 = () => {
  if (!registerData.value.password.trim()) {
    passwordError2.value = 'Password cannot be empty';
  } else {
    passwordError2.value = '';

  }
};
// 注册
const register = async () => {
  validateUsername2();
  checkPasswordEmpty2();
  validateEmail();
  if (!usernameError2.value && !passwordError2.value && !emailError2.value
      && registerData.value.username && registerData.value.password && registerData.value.email) {
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
}
};


</script>
<style lang="scss">
.singin-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/signin/hai1.jpg') no-repeat center center;
  background-size: cover;
  .slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
      width: 400px;
      height: 500px;
      background: rgba(17, 25, 40, 0.75);
      backdrop-filter: blur(16px) saturate(0);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 40px 60px;
      box-shadow: rgba(50, 50, 93, 0.25) 50px 50px 100px -20px,
        rgba(0, 0, 0, 0.5) 30px 30px 60px -30px rgba(212, 217, 222, 0.35) 2px -2px 6px 0px inset;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 10px;
      z-index: 3;
      transition: 0.25s ease-in-out;

      &.hidden {
        height: 395px;
        box-shadow: none;
        z-index: 1;
      }

      .title {
        font-size: 25px;
        color: rgb(246, 240, 255);
        letter-spacing: 1px;
        font-weight: 300;
        margin-bottom: 5px;
        color: #8BC34A;
      }
      .subtitle {
        font-size: 15px;
        margin-top: 3px;
        color: rgb(246, 240, 255);
        letter-spacing: 1px;
        margin-bottom: 35px;
      }
      .inputf {
        width: 100%;
        position: relative;
        margin-bottom: 35px;
        input {
          width: 92%;
          height: 35px;
          border: none;
          outline: 1.5px solid rgb(200, 200, 220);
          background: transparent;
          border-radius: 8px;
          font-size: 12px;
          padding: 0 15px;
          color: rgb(246, 249, 255);
          &::placeholder {
            color: rgb(175, 180, 190);
          }
          &:focus {
            outline: 1.5px solid rgb(224, 229, 240);
            &::placeholder {
              opacity: 0;
            }
            & + .lable {
              opacity: 1;
              top: -20px;
            }
          }
          &:not(:placeholder-shown) + .lable {
            opacity: 1;
            top: -20px;
          }
        }
        .lable {
          position: absolute;
          top: 0;
          left: 0;
          color: rgb(246, 249, 255);
          font-size: 11px;
          font-weight: bold;
          transition: 0.25s ease-out;
          opacity: 0;
        }
        .error-message {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      button {
        width: 100%;
        height: 35px;
        background: #8BC34A;
        color: #ffffff;
        border: none;
        outline: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
      }
    }
    .card {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 430px;
      height: 400px;
      background: url('../assets/signin/animal1.png') white;
      background-size: contain;
      padding: 60px;
      border-radius: 0 10px 10px 0;
      transition: 0.5s ease-in-out;
      z-index: 2;
      &.active {
        right: calc(100% - 550px);
        border-radius: 10px 0 0 10px;
      }
      .head {
        font-size: 34px;
        margin-bottom: 35px;
        .name {
          font-weight: 500;
          span {
            color: #8BC34A;
            font-size: bold;
          }
        }
      }
      .desc {
        font-size: 14px;
        text-align: justify;
        margin-bottom: 35px;
      }
      .btn {
        font-size: 14px;
        button {
          background: #8BC34A;
          font-size: 14px;
          padding: 5px 15px;
          border: none;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
