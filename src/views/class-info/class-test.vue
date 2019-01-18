<template>
	<section>
	<!--工具条-->
	<el-col :span="24" class="toolbar" style=" padding-bottom: 0px;">
		<el-form :inline="true" style="float:left">
			<el-form-item>
				<el-input  placeholder="试题名称或id" v-model="search"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
	</el-col>       
	<!--列表-->
	<template>
		<el-table
			ref="multipleTable"
			:data="tableData3.filter(data => !search || data.paper_id.toLowerCase().includes(search.toLowerCase())||data.paper_name.toLowerCase().includes(search.toLowerCase()))"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="试卷编号" width="120" prop="paper_id">
			</el-table-column>
			<el-table-column
			prop="paper_name"
			label="试卷名称"
			width="240">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
					size="mini"
					@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
					<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">删除试题</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<el-button @click="toggleSelection()">取消选择</el-button>
			<el-button type="danger" @click="toggleSelection()">删除选中</el-button>
		</div>
	</template>
	<!-- 试卷详情遮罩信息 -->
		<el-dialog width="90%" title="试卷详情" :visible.sync="dialogTableVisible">
			<el-tabs type="border-card">
			<el-tab-pane label="试卷信息">
				<template>
					<el-table
						:data="tableData"
						style="width: 100%">
						<el-table-column
							type="index"
							width="60">
						</el-table-column>
						<el-table-column
							prop="type"
							label="题型"
							width="50">
						</el-table-column>
						<el-table-column
							prop="question"
							label="问题"
							width="180">
						</el-table-column>
						<el-table-column
							prop="optionA"
							label="选项A">
						</el-table-column>
						<el-table-column
							prop="optionB"
							label="选项B">
						</el-table-column>
						<el-table-column
							prop="optionC"
							label="选项C">
						</el-table-column>
						<el-table-column
							prop="optionD"
							label="选项D">
						</el-table-column>
						<el-table-column
							prop="correct_option"
							label="正确答案">
						</el-table-column>
					</el-table>
				</template>
			</el-tab-pane>
			<el-tab-pane label="考试信息">
				<template>
					<el-table
						:data="user_paper"
						style="width: 100%">
						<el-table-column
							prop="user_id"
							label="成员ID"
							>
						</el-table-column>
						<el-table-column
							prop="usename"
							label="姓名"
							>
						</el-table-column>
						<el-table-column
							prop="score"
							label="得分">
						</el-table-column>
						<el-table-column
							prop="percent"
							label="正确率">
						</el-table-column>
					</el-table>
				</template>
			</el-tab-pane>
		</el-tabs>
	</el-dialog>

	</section>
</template>
<script>
import {getclasslist,getuser_paper} from '../../api/api'
  export default {
    data() {
      return {
				//班级成员信息
				tableData3: [],
	      // 试卷试题信息
				tableData: [],
				user_paper:[],
				multipleSelection: [],
				search: '',
        dialogTableVisible: false
      }
    },
		mounted(){
			this.getlist()
		},
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
			},
			//获取试卷信息
			getlist(){
				let _this=this;
				let params={
					id:_this.$route.params.id,
					type:2
				};
				getclasslist(params).then((data) => {	
					for(var i=0;i<data.length;i++){
						_this.tableData3.push({
							 paper_id:data[i].paper_id,
							 paper_name:data[i].paper_name
					 	});
					 }
				});
			},
			//展开遮罩
			handleEdit(index, row) {
			//console.log(index, row.paper_id);
				this.dialogTableVisible=true;
				//遮罩内试卷信息
				let _this=this;
				let params={
					id:row.paper_id,
					type:3
				};
				let param2={
					paper_id:row.paper_id,
					class_id:_this.$route.params.id
				}
				getclasslist(params).then((data) => {	
					_this.tableData=data;
				});
				getuser_paper(param2).then((data) => {
					_this.user_paper=data;
				});
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
    }
  }
</script>

<style scoped>
.el-dialog--small {
    width: auto;
}
</style>
