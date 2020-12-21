<template>
  <div id="appvuespringboot">
    <i class="el-icon-time" style="display: inline-block;"></i> <p style="font-size: large;display: inline-block;">当前时间：{{ nowTime }}</p>
    <!--      <div id="mywordcloud" :style="{width: '1000px', height: '120px'}" :data="worddata" style="margin: 0 auto"></div>-->
    <!--      <el-row class="demo-avatar demo-basic">-->
    <!--        <el-col :span="12">-->
    <!--          <div class="sub-title"></div>-->
    <!--          <div class="demo-basic&#45;&#45;circle">-->
    <!--            <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <img alt="vue logo" src="../assets/logo.png">-->
    <!--      <img src="../assets/django_logo.png">-->
    <div>
      <div style="display: inline-block;"><img alt="vue logo" src="../assets/logo.png"></div>&nbsp;&nbsp;&nbsp;
      <div style="display: inline-block;color: #409EFF;vertical-align: top;font-weight: 300;font-size: 2.1em"><h1>Element-UI</h1></div>
    </div>
<!--    <h1>{{ msg }}</h1>-->
    <h1>Welcome to My Vue.js & <label class="greensb">SpringBoot</label> App</h1>
    </br>
    <div>
      <span><i class="el-icon-school">&nbsp;</i>南京邮电大学-本科-通信工程</span>
      <el-divider direction="vertical"></el-divider>
      <span>南京邮电大学-研究生-软件工程</span>
      <el-divider direction="vertical"></el-divider>
      <span><i class="el-icon-phone">&nbsp;</i>18351922995</span>
      <el-divider direction="vertical"></el-divider>
      <span><i class="el-icon-s-promotion">&nbsp;</i>bluesaltssj@gmail.com</span>
    </div>
    </br>
    <ul>
      <li><h2>Home Page</h2>
        <ul>
          <li>
            <a
              href="https://www.guanacossj.com"
              target="_blank"
            >
              arithmeticjia
            </a>
          </li>
        </ul>
      </li>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <li><h2>Start Now</h2>
        <ul>
          <li>
            <router-link to="/cloud/index">home</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <el-button type="text" style="text-align: center" @click="dialogVisible = true"><h1>Who am i?</h1></el-button>
    <el-dialog
      title="我的名字叫"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span style="font-size: 20px">单沙嘉(ShanShajia)</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "VueSpringBoot",
        data() {
          return {
            msg: 'Welcome to My Vue.js & SpringBoot App',
            nowTime: ""
          }
        },
        created(){
          this.getTime();
        },
        methods: {
          getTime() {
            setInterval(()=>{
              //new Date() new一个data对象，当前日期和时间
              //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
              this.nowTime = new Date().toLocaleString();
            },1000);
          },
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
          open() {
            this.$alert('单沙嘉', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'success',
                  message: `联系我吧`
                });
              }
            });
          },
        }
    }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .el-row{
    float: right;
    display: inline;
    position:absolute;
    top:15px;
    right:40px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .greensb {
    color: #42b983;
    font-weight: bolder;
  }
  #appvuespringboot {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
  }
</style>
