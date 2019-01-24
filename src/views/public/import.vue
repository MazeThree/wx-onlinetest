<template>
	<section>
        <span>{{type}}</span>
	<!--工具条-->
	<el-col :span="24" class="toolbar" style=" padding-bottom: 0px;">
		<el-form :inline="true" style="float:left">
			<el-form-item>
				<el-input  placeholder="试题名称" v-model="search"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" >添加选中</el-button>
			</el-form-item>
		</el-form>
	</el-col>       
	<!--列表-->
	<template>
    <el-table
        id="out-table"
        ref="multipleTable"
        :data="tableData3.filter(data => !search || data.question.toLowerCase().includes(search.toLowerCase()))"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="question"
      label="问题"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="optionA"
      label="选项A"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="optionB"
      label="选项B"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="optionC"
      label="选项C"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="optionD"
      label="选项D"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="correct_option"
      label="正确选项">
    </el-table-column>
			<el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="addRow(scope.$index, tableData3)"
          type="text"
          size="small">
          添加
        </el-button>
      </template>
    </el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button> -->
			<el-button @click="toggleSelection()">取消选择</el-button>
			<el-button type="danger" @click="add()">添加选中</el-button>
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
import {get_question} from '../../api/api'
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
        //console.log(this.type);
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
      addRow(index, rows) {
          //console.log(rows);
          //向父组件传值
          let arr=[rows[index]];
          //console.log(arr);
        this.$emit('add_que',arr);
        rows.splice(index, 1);
        this.$message({
              message: '添加成功',
              type: 'success'
            });
      },
      add() {
        //获取选中列
        let arr=this.multipleSelection
        this.$confirm('将添加到试卷，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          //加1是因为两者起始位置不一样
          this.$emit('add_que',arr);
            for(let i=0;i<arr.length+1;i++){
              this.tableData3.splice(arr[i],i)
            };
            this.$message({
              message: '添加成功',
              type: 'success'
            });
        })      
        },
    getlist(){
        let _this=this;
        let params={
            page:_this.page,
            pageNum:_this.pageNum
        };
        get_question(params).then((data) => {
            //console.log(data.total);
            //必须要转为int，因为data传过来的值是string类型
            _this.total1=parseInt(data.total);
            _this.tableData3=[];
            //_this.tableData3 = data.list;
            for(var i=0;i<data.list.length;i++){
                //根据题型展示对应试题
                //if(data.list[i][0]==_this.type){
                    _this.tableData3.push({
                        type:data.list[i][0],
                        question:data.list[i][1],
                        optionA:data.list[i][2],
                        optionB:data.list[i][3],
                        optionC:data.list[i][4],
                        optionD:data.list[i][5],
                        correct_option:data.list[i][6]
                    });
                }
                //}
        });
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val;
        this.getlist();
        }
    },
    //接收父组件的值
    props:['type']
  }
</script>