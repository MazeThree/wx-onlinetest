<template>
<div>
	<el-row :gutter="12">
	<el-col :span="7" class="left">
		<el-card class="logo" style="height:20%;">
		</el-card>
		<el-card>
			<h3>系统公告</h3>
			<p>欢迎进入后台管理系统,系统基础信息如下：</p>
			<ul>
				<li>所属院校：湖南理工学院</li>
				<li>所属学院：信息学院</li>
				<li>所属班级：计15-4BJ</li>
				<li>系统所有人：吴  鹏</li>
				<li>创建时间：2018年10月</li>
				<li>最近更新时间：2019年4月</li>
			</ul>
			<p>如有疑问可联系作者：</p>
			<ul>
				<li>QQ:1849630277</li>
				<li>微信：Maze1220</li>
			</ul>
		</el-card>
	</el-col>
	<el-col :span="17" class="right">
		<el-row :gutter="12" style="height:15%">
			<el-col :span="8">
		<el-card>
			<div class="el-icon-circle-check">
				设计人员：吴 鹏
			</div>
		</el-card>
			</el-col>
			<el-col :span="8">
		<el-card>
		<div class="el-icon-circle-check">
				开发人员：吴 鹏
			</div>
		</el-card>
			</el-col>
			<el-col :span="8">
		<el-card>
		<div class="el-icon-circle-check">
				测试人员 ：吴 鹏
			</div>
		</el-card>
			</el-col>
		</el-row>
		<!-- todolist模块 -->
		<el-card class="box-card" style="height:80%">
			<div slot="header" class="clearfix">
				<span>我的记事本：</span>
				<el-input type="text" style="width:60%;" v-model="newitem" v-on:keyup.enter="addNew" placeholder="输入待办事宜"></el-input>
				<el-button type="primary" @click="addNew">添加</el-button>			
			</div>
			<div class="text item">
					<h3>可离线记事本</h3>
					<!--index用于删除定位-->
					<div v-for="(item,index) in items" v-bind:class="{finish:item.isfinished}" @click="toggleFinish(item)">
						{{index+1}}--{{item.label}}
						&nbsp&nbsp<el-button @click="delItem">删除</el-button>
					</div>
			</div>
		</el-card>
	</el-col>
	</el-row>
	<!-- <el-row :gutter="12" class="bottom">
	<el-col :span="12">
		<el-card>
		总是显示
		</el-card>
	</el-col>
	<el-col :span="12">
		<el-card>
		总是显示
		</el-card>
	</el-col>
	</el-row> -->
</div>
</template>

<script>
  //导入本地存储方法
import Store from '../stroe'
	export default {
		data(){
			return {
				sysUserName:'',
				//todolist数据存储
				items:Store.fetch(),
      			newitem:''
			}
		},
		 //监听items的变化
		watch: {
			items: {
			handler: function (items) {
				Store.save(items)
			},
			deep: true
			}
		},
		methods: {
			toggleFinish: function (item){
			item.isfinished = !item.isfinished;
			},
			addNew: function(){
			//输入优化，判断是否为空
			if(this.newitem==''){
				alert("请输入非空值！");
				return 0;
			}
			else {
				//传值进items
				this.items.push({
				label: this.newitem,
				isfinished: false
				});
				this.newitem = ''
			}
			},
			delItem: function (index) {
			this.items.splice(index,1)
			}
		},
		mounted(){
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user || '';
				
			}
		}
	}
</script>
<style scoped>
.el-row {
    margin-bottom: 15px;
  }
  .el-card{
	  margin-bottom: 10px;;
  }
	.logo{
		background: url('../assets/logo.png') no-repeat center;
		background-size: 90%;
	}
  .row-bg {
    padding: 10px;
    background-color: #f9fafc;
  }
  .left,.right{
	  height: 450px;
  }
  .left .el-card{
	  height: 75%;
  }
  .bottom .el-col .el-card{
	  height: 350px;
  }
.finish{
    text-decoration:line-through;
	}
</style>