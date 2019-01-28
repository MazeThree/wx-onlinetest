<template>
<div>
  <!--工具条-->
	<el-col :span="24" class="toolbar" style=" padding-bottom: 0px;">
		<el-form :inline="true" style="float:left">
			<el-form-item>
      <input type="file" id="file22" @change="import1('file22')" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sub()" class="el-icon-upload">提交</el-button>
			</el-form-item>
		</el-form>
	</el-col> 

<el-table
    height="350"
    ref="multipleTable"
    :data="tableData3"
    v-loading="loading"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="type"
      label="题型"
      width="80">
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
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button type="danger" @click="deleteRow()">删除选中</el-button>
  </div>
</div>
</template>
<script>
import {add_question} from '../../api/api'
export default {
  data() {
    return {
      tableData3: [],
        loading:false,
        multipleSelection: [],
    }
  },
  methods: {
    //文件导入，需调用excel导入的插件xlsx,详情见excel.js,方法已挂载，直接调用
    import1(a){
      this.loading=true
      this.$importf(a).then(data => {
        this.loading=false;
        //console.log(data);
        for(var i=0,l=data.length;i<l;i++){
          //考虑到导入数据为json对象，但导入键名无法统一，且数据不一定规整，所以无法通过键名进行取值，故将对象转为字符串，对字符串进行拆分取值
          // let a=JSON.stringify(data[i]).split(",");
          // let arr1=[];
          // for(let b=0;b<4;b++){
          //   let c=a[b].split(":");
          //   arr1.push(c[1]);
          // }
          //拆分后汉字带有双引号，该方法弃用
          //嵌套for循环实现json对象不规则键名的值的遍历
          var arr1=[];
          for(var j in data[i]){
            // console.log(data[i][j]);
            arr1.push(data[i][j])
          }
           //console.log(arr1);
          this.tableData3.push({
            type:arr1[0],
            question:arr1[1],
            optionA:arr1[2],
            optionB:arr1[3],
            optionC:arr1[4],
            optionD:arr1[5],
            correct_option:arr1[6]
          });
        }
      });
    },
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
      //删除选中
      deleteRow() {
        //获取选中列
        let arr=this.multipleSelection
        this.$confirm('将删除选中行，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          //加1是因为两者起始位置不一样
            for(let i=0;i<arr.length+1;i++){
              this.tableData3.splice(arr[i],i)
            };
            this.$message({
              message: '删除成功',
              type: 'success'
            });
        })      
        },
        //上传数据
        sub:function(){
          if(this.tableData3!=""){
          this.$confirm('将上传至数据库，请确定数据有效性，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          var Params = this.tableData3;
         //console.log(Params);
            add_question(Params).then(data => {
              let { code,msg } = data;
              if (code==1) {
                //防止多次重复提交，减少数据冗余
                this.tableData3=[];
                this.$message({
                  message:"导入成功",
                  type: 'success'
                });
              } else {
                this.$message({
                  message:"导入失败，请检查数据结构是否正确",
                  type:'error',
                });
              }
            }); 
          })
        }else{
          alert("请勿提交空数据！！！");
        }
        }
    },
  mounted() {  
  }
}
</script>