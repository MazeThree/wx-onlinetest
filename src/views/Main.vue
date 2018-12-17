<template>
<div>
	<el-row :gutter="12">
	<el-col :span="7" class="left">
		<el-card>
		总是显示
		</el-card>
		<el-card>
		总是显示
		</el-card>
	</el-col>
	<el-col :span="17" class="right">
		<el-row :gutter="12" style="height:15%">
			<el-col :span="8">
		<el-card>
		总是显示
		</el-card>
			</el-col>
			<el-col :span="8">
		<el-card>
		总是显示
		</el-card>
			</el-col>
			<el-col :span="8">
		<el-card>
		总是显示
		</el-card>
			</el-col>
		</el-row>
		<!-- todolist模块 -->
		<el-card class="box-card" style="height:80%">
			<div slot="header" class="clearfix">
				<span>我的todolist：</span>
				<el-input type="text" style="width:60%;" v-model="newitem" v-on:keyup.enter="addNew" placeholder="输入待办事宜"></el-input>
				<el-button type="primary" @click="addNew">添加</el-button>			
			</div>
			<div class="text item">
					<!--index用于删除定位-->
					<div v-for="(item,index) in items" v-bind:class="{finish:item.isfinished}" @click="toggleFinish(item)">
						{{index+1}}--{{item.label}}
						&nbsp&nbsp<el-button @click="delItem">删除</el-button>
					</div>
			</div>
		</el-card>
	</el-col>
	</el-row>
	<el-row :gutter="12" class="bottom">
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
	</el-row>
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
  .row-bg {
    padding: 10px;
    background-color: #f9fafc;
  }
  .left,.right{
	  height: 400px;
  }
  .left .el-card{
	  height: 48%;
  }
  .bottom .el-col .el-card{
	  height: 350px;
  }
.finish{
    text-decoration:line-through;
  }
</style>