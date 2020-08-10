<template>
  <div>
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="formData.form">
          <el-form-item label="用户名">
            <el-input v-model="formData.form.name" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="()=>{loadData(formData.form.name)}" :loading="loading.table">查询</el-button>
            <el-button type="primary" @click="()=>{add()}">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  <el-table
    :data="tableData"
    :span="24"
    style="width: 60%; margin:auto;"
    max-height="250">
    <el-table-column
      fixed
      prop="ID"
      label="ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="stunum"
      label="学号"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button size="mini" split-button type="primary" @click="()=>query(scope.$index, scope.row)">查看</el-button>
        <el-button size="mini" split-button type="primary" @click="()=>update(scope.$index, scope.row)">修改</el-button>
        <el-button size="mini" split-button type="primary" @click="()=>del(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <AddUpdateUserInfoDialog :type="'update'" ref="updateInfoDialog" />
    <AddUpdateUserInfoDialog :type="'add'" ref="addInfoDialog"/>
  </div>
</template>

<script>
import AddUpdateStuInfoDialog from '../components/AddUpdateStuInfoDialog'
export default {
  name:'StuInfo',
  data () {//自己定义的属性,所有控件用到的属性必须在这里定义
    return {
      formData: {
        form: {//检索数据
          name: null,
        }
      },
        tableData: [{
          ID: '2016-05-03',
          name: '王小虎',
          stunum: '123'
        }, {
          ID: '2016-05-03',
          name: '王小虎',
          stunum: '123'
        },{
          ID: '2016-05-03',
          name: '王小虎',
          stunum: '123'
        },{
          ID: '2016-05-03',
          name: '王小虎',
          stunum: '123'
        },{
          ID: '2016-05-03',
          name: '王小虎',
          stunum: '123'
        },],
      loading: {//是否显示正在加载中的小圈圈
        table: false,//table加载遮罩
        del: false,//删除按钮加载遮罩
        upConfirm: false,//删除按钮加载遮罩
        resetPwd: false,//重置密码
      }
    }
  },
  methods:{//自定义方法
    loadData: function(name){//加载数据
        this.loading.table = true;
        this.$axios({
          method: 'post',
          url: '/users/query',
          data:{
            "name":name
          }
        }).then((data) => {
          this.tableData.length=data.data.length;
          for(let key in data.data){
            this.tableData[key].ID = data.data[key].id;
            this.tableData[key].name=data.data[key].name;
            this.tableData[key].stunum=data.data[key].studentnumber;
            console.info(this.tableData[key].ID);
          }
          
          this.loading.table = false;
        }).catch((data) => {
          this.loading.table = false;
          this.$message.error(data.msg);
        });
    },
    update: function(index,rows){//修改按钮
      let data = Object.assign({},rows[index]);
      this.$refs.updateInfoDialog.openDialog(data);
    },
    query: function(index,rows){//
      this.$refs.updateInfoDialog.openDialog(rows[index]);
    },
    //新增用户方法
    add:function(){
      this.$refs.addInfoDialog.openDialog({});
    },
    del:function(index){
      this.loading.table = true;
      this.formData.name='';
        this.$axios({
          method: 'post',
          url: '/users/delete',
          data:{
            "id":this.tableData[index].ID
          }
        }).then(() => {
          this.loadData();
        }).catch((data) => {
          this.loading.table = false;
          this.$message.error(data.msg);
        });
    }
  },
  created: function() {//初始化组件方法
    this.loadData();
  },
  components:{
    AddUpdateStuInfoDialog:AddUpdateStuInfoDialog,
  }
}

</script>