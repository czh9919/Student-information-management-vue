<template>
  <div class="login page">
    <div class="login">
      <el-row>
        <div><h3>Login Page</h3></div>
      </el-row>
    </div>
    <p>
      <el-row class="log input">
        <el-form class="login-form">
          <el-form-item>
            <el-input name="name" v-model="input" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" type="password" placeholder="Password" prefix-icon="fas fa-lock"></el-input>
          </el-form-item>
          <p>
            <el-button v-on:click="login_button">登录</el-button>
          </p>
        </el-form>
      </el-row>
    </p>
  </div>
</template>

<script>
//import {userApi} from "../utils/api"
export default {
  name:'Login',
  data:function() {
    return {
      input:'',
      password:''
    }
  },
  methods: {
    login_button:function(){
      this.$axios({
        method: 'post',
        url: 'http://localhost:9033/login',
        data:{
          name:this.input,
          password:this.password
        }
      }).then(response=>{
        alert(response) //success
      }).catch(response=>{
        alert(response) //failed
      })
    }
  }
}
</script>



<style scoped>
 .login {
  flex: 1;

  justify-content: center;
  align-items: center;
}
.login-form{
  margin: 0 auto;
}
.login-input {
  width: 100%;
  margin-top: 40px;
  align-items: center;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
