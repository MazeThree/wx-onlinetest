<template>
<div>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="班级编号">
			<el-input readonly="true" value="201812"></el-input>
		</el-form-item>
    <el-form-item label="班级名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="加入条件">
			<el-select v-model="form.type" placeholder="请选择活动区域">
				<el-option label="允许任何人加入" value="0"></el-option>
				<el-option label="通过申请加入" value="1"></el-option>
				<el-option label="通过邀请加入" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="班级性质">
			<el-checkbox-group v-model="form.typ">
				<el-checkbox label="临时班" name="type"></el-checkbox>
				<el-checkbox label="课堂作业" name="type"></el-checkbox>
				<el-checkbox label="集中考试" name="type"></el-checkbox>
				<el-checkbox label="问卷调查" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="班级备注">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('form')" :loading="sub">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</div>
</template>
<script>
import { getclasslist } from '../../api/api';
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getlist(){
        
      }
    }
  }
</script>