<template>
  <div class="register page">
    <div class="register">
      <el-row>
        <div><h3>register Page</h3></div>
      </el-row>
    </div>
    <p>
      <el-row class="log input">
        <el-form class="register-form">
          <el-form-item>
            <el-input name="name" v-model="input" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" type="password" placeholder="Password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <p>
            <el-button v-on:click="register_button">注册</el-button>
          </p>
        </el-form>
      </el-row>
    </p>
  </div>
</template>

<script>
//import {userApi} from "../utils/api"
export default {
  name:'reg_1',
  data:function() {
    return {
      input:'',
      password:''
    }
  },
  methods: {
    register_button:function(){
      this.$axios({
        method: 'post',
        url: '/users/register',
        data:{
          name:this.input,
          password:this.password
        }
      }).then(response=>{
        console.log(response.data) //success
      }).catch(response=>{
        alert(response) //failed
      })
    }
  }
}
</script>



<style scoped>
 .register {
  flex: 1;

  justify-content: center;
  align-items: center;
}
.register-form{
  margin: 0 auto;
}
.register-input {
  width: 100%;
  margin-top: 40px;
  align-items: center;
}
.register-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
