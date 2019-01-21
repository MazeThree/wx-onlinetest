<template>
	<section>
	<!--工具条-->
	<el-col :span="24" class="toolbar" style=" padding-bottom: 0px;">
		<el-form :inline="true" style="float:left">
			<el-form-item>
				<el-input  placeholder="姓名或id" v-model="search"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="exportExcel ()" class="el-icon-upload">导出数据</el-button>
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
		<el-table
			id="out-table"
			ref="multipleTable"
			:data="tableData3.filter(data => !search || data.user_name.toLowerCase().includes(search.toLowerCase())||data.userid.toLowerCase().includes(search.toLowerCase()))"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="班级编号" width="120" prop="classnum">
			</el-table-column>
			<el-table-column
			prop="userid"
			label="学生编号"
			width="120">
			</el-table-column>
			<el-table-column
			prop="user_name"
			label="学生姓名"
			width="120">
			</el-table-column>
			<el-table-column
			prop="type"
			label="加入状态"
			width="120">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">踢出班级</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button> -->
			<el-button @click="toggleSelection()">取消选择</el-button>
			<el-button type="danger" @click="toggleSelection()">删除选中</el-button>
			<!-- //分页按钮 -->
			<div class="block" style="float:right">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage3"
				:page-size="pageNum"
				background
				layout="total,prev, pager, next, jumper"
				:total="total1">
				</el-pagination>
			</div>
		</div>
	</template>	
	</section>
</template>
<script>
// 表格导出为excel方法
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {getmember} from '../../api/api'
  export default {
    data() {
      return {
				total1:1,
				page:1,
				pageNum:5,
				currentPage3: 1,
        tableData3: [],
				multipleSelection: [],
				search: ''
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
			getlist(){
				let _this=this;
				let params={
					id:_this.$route.params.id,
					page:_this.page,
					pageNum:_this.pageNum
				};
				getmember(params).then((data) => {
					//console.log(data.total);
					//必须要转为int，因为data传过来的值是string类型
					_this.total1=parseInt(data.total);
					_this.tableData3=[];
					//_this.tableData3 = data.list;
					for(var i=0;i<data.list.length;i++){
						_this.tableData3.push({
							 classnum:data.list[i][0],
							 userid:data.list[i][1],
							 user_name:data.list[i][2],
							 type:data.list[i][3]
					 	});
					 }
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.page=val;
				this.getlist();
			},
			exportExcel () {
				this.pageNum = 60;//表格长度变长
				this.page= 1;
				this.getlist();
				var _this=this;
				this.$confirm('此操作将导出文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					this.$nextTick(function () {
						let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
						/* get binary string as output */
						let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
						try {
								FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '班级成员表.xlsx')
						} catch (e) {
								if (typeof console !== 'undefined') console.log(e, wbout)
						}
						 _this.pageNum = 5;//表格还原
						 _this.getlist();
						 _this.$message({
            type: 'success',
            message: '导出成功!'
          });
						return wbout
				});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
		},
    }
  }
</script>