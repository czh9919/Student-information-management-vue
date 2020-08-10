<template>
  <el-dialog :title="title" :visible.sync="showUpUser">
    <el-form :model="userFrom" ref="userFrom" :rules="userFromRole">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item label="ID" :label-width="'120px'" prop="id">
                <el-input v-model="userFrom.id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="姓名" :label-width="'120px'" prop="name">
                <el-input v-model="userFrom.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="学号" :label-width="'120px'" prop="stunum">
                <el-input v-model="userFrom.stunum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="()=>{closeDialog()}">取消</el-button>
      <el-button type="primary" @click="()=>{updateStu()}">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {isNull} from "../utils/util"
export default {
  name: 'AddUpdateStuInfoDialog',
  props: {
    type: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["add", "update", "query"].indexOf(value) !== -1
      }
    }
  },
  data () {//自己定义的属性,所有控件用到的属性必须在这里定义
    let title = "新增用户";
    if (this.type === "update") {
      title = "修改用户";
    } else if(this.type === "query"){
      title = "查看用户";
    }
    return {
      title,
      userFrom:{
        id: '',
        name: '',
        stunum: '',
        //headImg: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        // imageUrl: '',
      },
      
      showUpUser: false,
      userFromRole:{
        StuNum:[
          {required: true, message: '请输入学号', tigger: "blur"}
        ],
        name:[
          {required: true, message: '请输入姓名', tigger: "blur"}
        ],
      }
    }
  },
  methods:{
    updateStu:function(){
      this.$refs.userFrom.validate((valid) => {//form表单校验回调,userFrom需要定义在form标签的ref属性
        if(valid){
          const loading = this.openLoading();
          this.$axios({
              method: 'post',
              url: '/users/update',
              data:{
                  id:this.userFrom.id,
                  name:this.userFrom.name,
                  StuName:this.userFrom.stunum
              }
          }).then(() => {
            loading.close();
            this.$emit("reloadData", 1);//触发在父组件定义的reloadData事件
            this.closeDialog();
            this.$message.success('修改成功!');
          }).catch((data) => {
            loading.close();
            this.$message.error(data.msg);
          })
        }
      });
    },
    openDialog:function (data)
    {
      this.showUpUser = true;
      if(!isNull(data)){
        for (const key in this.userFrom) {
          this.userFrom[key] = data[key];
        }
      }
    },
    closeDialog:function(){
      this.showUpUser = false;
    },

  }
}
</script>

<!-- 添加scoped代表该css样式之作用在当前组件,如果有通用样式可定义在assets/css内 -->
<style scoped>
/* >>> 代表深度选择器 */
.avatar-uploader >>> .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

/* border会占用高度和宽度,所以动态计算calc */
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  line-height: 270px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409EFF;
}
.avatar-uploader{
    padding: 0px 0px 20px 20px;
    height: 290px;
}
</style>
