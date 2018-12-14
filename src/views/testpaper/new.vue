<template>
<div class="app">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;" @submit.prevent="onSubmit" >
	<el-form-item label="试题名称" prop="name">
		<el-input v-model="ruleForm.name"></el-input>
	</el-form-item>
  <el-form-item label="考试时长" prop="time">
		<el-select v-model="ruleForm.time" placeholder="单位/分钟">
		<el-option label="15分钟" value="15"></el-option>
		<el-option label="45分钟" value="45"></el-option>
    <el-option label="90分钟" value="90"></el-option>
    <el-option label="120分钟" value="120"></el-option>
    <el-option label="150分钟" value="150"></el-option>
		</el-select>
	</el-form-item>
	<el-form-item label="试卷类型" prop="type">
		<el-select v-model="ruleForm.type" placeholder="请选择试卷类型">
		<el-option label="类型一" value="1"></el-option>
		<el-option label="类型二" value="2"></el-option>
    <el-option label="类型三" value="3"></el-option>
		</el-select>
	</el-form-item>
	<el-form-item label="有效期" required>
		<el-col :span="11">
		<el-form-item prop="begin">
			<el-date-picker
       type="date" 
       placeholder="开始日期" 
       v-model="ruleForm.begin"
      format="yyyy 年 MM 月 dd 日"
      style="width: 100%;"></el-date-picker>
		</el-form-item>
		</el-col>
		<el-col class="line" :span="2">-</el-col>
		<el-col :span="11">
		<el-form-item prop="end">
			<el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.end" style="width: 100%;"
      format="yyyy 年 MM 月 dd 日"></el-date-picker>
		</el-form-item>
		</el-col>
	</el-form-item>
	<el-form-item label="试题分值" prop="score">
		<el-radio-group v-model="ruleForm.score">
    <el-radio label="60">60分</el-radio>
		<el-radio label="100">100分</el-radio>
		<el-radio label="120">120分</el-radio>
    <el-radio label="150">150分</el-radio>
    <el-radio label="0">不确定分值</el-radio>
		</el-radio-group>
	</el-form-item>
	<el-form-item label="相关备注" prop="desc">
		<el-input type="textarea" v-model="ruleForm.desc"></el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="submitForm('ruleForm')" :loading="sub">立即创建</el-button>
		<el-button @click="resetForm('ruleForm')">重置</el-button>
	</el-form-item>
	</el-form>
</div>
</template>
<script>
import { test_new } from '../../api/api';
 export default {
    data() {
      return {
        sub:false,//防止用户多次提交
        ruleForm: {
          name: '',
          time:'',
          type:'1',
          begin:'',
          end: '',
          score:'',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入试题名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入考试时长，以分钟为单位', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择试题类型', trigger: 'change' }
          ],
          begin: [
            { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          end: [
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ],
         score: [
            { required: true, message: '请选择具体分值，不确定请选择最后一项', trigger: 'change' }
          ],
          desc: [
            { max:150, message: '最多输入150个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sub = true;
            var loginParams = this.ruleForm;
            test_new(loginParams).then(data => {
              this.sub = false;
              let { code,msg } = data;
              if (!code) {
                this.$message({
                  message: '用户名或密码错误',
                  type: 'error'
                });
              } else {
                this.$message('创建成功');
              }
            });
          } else {
            console.log('提交错误');
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

<style lang="scss" scoped>
.line{
  text-align: center;
}
</style>
