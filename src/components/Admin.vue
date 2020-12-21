<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span>中国名著</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="1-1">古代</el-menu-item>
            <el-menu-item index="1-2">现代</el-menu-item>
            <el-menu-item index="1-3">当代</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span>国外名著</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="2-1">美国</el-menu-item>
            <el-menu-item index="2-2">日本</el-menu-item>
            <el-menu-item index="3-3">德国</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span>国外名著</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="3-1">美国</el-menu-item>
            <el-menu-item index="3-2">日本</el-menu-item>
            <el-menu-item index="3-3">德国</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span>国外名著</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="3-1">美国</el-menu-item>
            <el-menu-item index="3-2">日本</el-menu-item>
            <el-menu-item index="3-3">德国</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span>国外名著</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="3-1">美国</el-menu-item>
            <el-menu-item index="3-2">日本</el-menu-item>
            <el-menu-item index="3-3">德国</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="booklist">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
<!--            <span>添加图书</span>-->
            <el-button style="padding: 3px 0" type="text" @click="dialogVisible = true">点击添加</el-button>
            <el-dialog
              title=""
              :visible.sync="dialogVisible"
              width="700px"
              :before-close="handleClose">
              <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="80px" style="padding: 20px">
                <el-form-item label="书名" prop="bookName">
                  <el-input v-model="form.bookName" placeholder="请填写书名"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="authorName">
                  <el-input v-model="form.authorName" placeholder="请填写作者"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="bookPublish">
                  <el-input v-model="form.bookPublish" placeholder="请填写出版社"></el-input>
                </el-form-item>
                <el-form-item label="出版时间" prop="publishTime">
                  <el-col :span="10">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.publishTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="封面图片">
                  <el-input v-model="facepicUrlShow"></el-input>
                  <el-upload
                    class="upload-facepic"
                    action="http://127.0.0.1:8085/yunprophet/bookapi/uploadfile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    ref="upload"
                    :auto-upload="true"
                    :limit="1"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :data="form">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="submitForm('form')">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';
  export default {
    name: "Admin",
    data() {
      return {
        headers: "",
        currentDate: new Date(),
        dialogVisible: false,
        bookList: [],
        loading: false,
        fileList: [],
        rules: {
          bookName: [
            { required: true, message: '请输入书名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          authorName: [
            { required: true, message: '请输入书作者', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          bookPublish: [
            { required: true, message: '请输入出版社', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          publishTime: [
            { required: true, message: '请选择出版时间', trigger: 'blur' },
          ],
        },
        facepicUrlShow: "",
        form: {
          bookName: '',
          authorName: '',
          bookPublish: '',
          publishTime: '',
          facepicUrl: ''
        }
      };
    },
    filters: {
      formatDate:function(date) {
        return moment(date).format("YYYY-MM-DD");
      }
    },
    mounted() {
      this.showBookss()
    },
    methods: {
      handleSuccess: function(response, file, fileList) {
        if(response.data === "error"){
          this.$message({
            type: 'error',
            message: `上传失败!`
          });
          this.$refs.upload.clearFiles()
        }
        this.form.facepicUrl = response.data;
      },
      handleChange:function (file, fileList) {
        this.facepicUrlShow = file.name;
      },
      submitForm(formname) {
        this.$refs[formname].validate(valid => {
          if (valid) {
            this.$refs.upload.submit();
            this.loading = true;
            axios({
              method:"post",
              url:"http://127.0.0.1:8085/bookapi/addBook",
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials:false,
              data:this.form
            }).then((res)=>{
              if(res.data.code === 200){
                this.loading = false;
                this.dialogVisible = false;
                this.$message({
                  type: 'success',
                  message: `添加成功!`
                });
              }else {
                this.$message({
                  type: 'error',
                  message: `服务器出了点问题，请稍后重试!`
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      showBookss () {
        this.$http.get('http://127.0.0.1:8085/bookapi/getBookAll',{
          _timeout:5000,
          onTimeout :(request) => {
            this.$message.error('请求超时');
            this.loading = false
          }
        }).then((response) => {
          var res = JSON.parse(response.bodyText);
          if (res.code === 200) {
            this.loading = false;
            this.bookList = res.data;
          } else {
            this.$message.error('查询数据失败');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-left: 100px;
    display: block;
    position: absolute;
  }
  .el-main {
    position: absolute;
    left: 300px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-card {
    width: 200px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    /*height: 250px;*/
    height: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .upload-facepic {
    text-align: left;
  }
  .dialog-footer {
    padding: 20px;
  }
</style>
