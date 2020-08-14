<template>
  <div id="app">
    <div id="nav">
      <el-menu  class="el-menu-demo" mode="horizontal" router="true" >
      <el-menu-item index="/" >Home</el-menu-item>
      <el-menu-item index="/about" >About</el-menu-item>
      <el-menu-item index="/login" >Login</el-menu-item>
      <el-menu-item index="/stuinfo" >学生信息</el-menu-item>
      <el-menu-item index="/stuinfo" >个人信息</el-menu-item>
    </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
