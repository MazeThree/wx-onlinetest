<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="login-container">
    <h3 class="title">在线测评后台</h3>
    <el-form-item label="账户" prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { Login } from '../api/api';
  export default {
    data() {
      var validateUse = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
      return {
        logining: false,
        ruleForm2: {
          account: 'Maze',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { validator:validateUse, trigger: 'blur' },
          ],
          checkPass: [
            { validator:validatePass, trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            Login(loginParams).then(data => {
              this.logining = false;
              let { id, usename, tel,password,level } = data;
              if (!id) {
                this.$message({
                  message: '用户名或密码错误',
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(usename));
                this.$router.push({ path: '/main' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
 .login-container{
    width: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #1472cf;
    }
    .remember {
      margin: 0px 0px 20px 0px;
    }
  }
</style>