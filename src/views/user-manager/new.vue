<template>
	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" style="max-width:320px;" class="demo-ruleForm">
	<el-form-item label="用户名" prop="usename">
    	<el-input type="text" v-model="ruleForm2.name" ></el-input>
  	</el-form-item>
  	<el-form-item label="手机" prop="tel">
    	<el-input type="tel" v-model="ruleForm2.tel" ></el-input>
  		</el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" ></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" ></el-input>
  </el-form-item>
  <el-form-item label="账户等级" prop="val">
  <el-select v-model="ruleForm2.val" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.val"
      :label="item.label"
      :value="item.val">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import {usernew} from '../../api/api';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
			name:'12306',
			tel:'12306',
          	pass: '123456',
		  	checkPass: '123456',
		  	val: '3'
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
		},
		options: [{
          val: '1',
          label: '管理员'
        }, {
          val: '2',
          label: '老师'
        }, {
          val: '3',
          label: '学生'
        }]
        
      };
    },
    methods: {
      submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				if (valid) {
					var ruleForm2=this.ruleForm2;
					var Params = {name:ruleForm2.name,password:ruleForm2.pass,tel:ruleForm2.tel,val:ruleForm2.val};
					//console.log(Params);
					usernew(Params).then(data => {
					let { code,msg } = data;
					if (!code) {
						this.$message({
						message: '创建失败！',
						type: 'error'
						});
					} else {
						this.$message('创建成功');
					}
					});
				} else {
					alert('提交错误');
					return false;
				}
				});
			},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>