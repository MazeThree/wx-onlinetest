<template>
<div>
	<el-form :model="form" ref="form" label-width="80px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;" @submit.prevent="onSubmit" >
		<el-form-item label="班级编号">
			<el-input v-model="form.class_id" disabled></el-input>
		</el-form-item>
    <el-form-item label="班级名称">
			<el-input v-model="form.class_name" :disabled="readonly"></el-input>
		</el-form-item>
		<el-form-item label="加入条件">
			<el-select v-model="form.class_join" placeholder="请选择活动区域" :disabled="readonly">
				<el-option label="允许任何人加入" value="0"></el-option>
				<el-option label="通过申请加入" value="1"></el-option>
				<el-option label="通过邀请加入" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="创建时间" >
				<el-input v-model="form.class_time" disabled></el-input>
		</el-form-item>
		<el-form-item label="班级备注" >
			<el-input type="textarea" v-model="form.class_desc" :disabled="readonly"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('form')" :disabled="readonly" :loading="sub">提交修改</el-button>
			<el-button @click="toggle()">编辑</el-button>
		</el-form-item>
	</el-form>
</div>
</template>
<script>
import { getclasslist,classinfo } from '../../api/api';
  export default {
    data() {
      return {
				readonly:true,
				sub:false,
        form: {
					class_id:'',
				}
      }
    },
    methods: {
      //   更新试卷信息
    submitForm(formName) {
      this.sub=true;
        this.$refs[formName].validate((valid) => {
            var upParams = this.form;
            classinfo(upParams).then(data => {
              this.sub=false;
              let { code,msg } = data;
              if (!code) {
                this.$message({
                  message: '更新失败',
                  type: 'error'
                });
              } else {
                this.$message('更新成功');
              }
            });
        });
      },
      getlist(){
				let para={
					type:5,
					id:this.$route.params.id
				};
				getclasslist(para).then((data) =>{
					this.form=data[0];
				});      
			},
			//切换编辑状态
      toggle(){
          this.readonly=!this.readonly;
      }
    },
		mounted(){
			this.getlist();
		}
  }
</script>