<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
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
</template>

<script>
import { class_new } from '../../api/api';
	export default {
		data() {
			return {
				sub:false,
				form: {
					name: '',
					type: '0',
					// type:[],//不存入数据库，暂时不用
					desc: '由xxxx创建'
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				if (valid) {
					this.sub = true;
					var Params = this.form;
					class_new(Params).then(data => {
					this.sub = false;
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
			}
		}
	}

</script>