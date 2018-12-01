<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style=" padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" style="float:left">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>

            <el-form :inline="true" style="float:right">
				<el-form-item label="邀请新成员">
					<el-input placeholder="请输入学生id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        
		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
                <el-table-column prop="id" label="账号" width="200" sortable>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">添加备注</el-button>
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">考过的试题</el-button>
						<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">踢出班级</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList1 } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserList1(para).then((res) => {
					this.users = res.data.users;
					this.loading = false;
					//NProgress.done();
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>