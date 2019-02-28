<template>
<section>
  <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="输入查询试卷名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
        <el-form-item>
				<el-button type="primary" @click="exportExcel ()" class="el-icon-upload">导出数据</el-button>
			</el-form-item>
			</el-form>
		</el-col>
    <template>
        <el-table
        id="list"
        :data="tableData"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          prop="test_id"
          label="试卷id"
          >
        </el-table-column>
        <el-table-column
          prop="test_name"
          label="试卷名称"
          >
        </el-table-column>
        <el-table-column
          prop="test_time"
          label="考试时长"
          >
        </el-table-column>
        <el-table-column
          prop="test_score"
          label="总分"
          >
        </el-table-column>
        <el-table-column
          prop="test_type"
          label="试卷类型"
          >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          >
        </el-table-column>
        <el-table-column
          prop="test_begin"
          label="开始时间"
          >
        </el-table-column>
        <el-table-column
          prop="test_end"
          label="结束时间"
          >
        </el-table-column>
        <el-table-column
          prop="test_tips"
          label="试卷备注">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
        </el-table-column>
      </el-table>
    </template>
</section>
</template>

  <script>
  import { getPaperList } from '../../api/api';
    export default {
      data() {
        return {
          loading:false,
          tableData: [{
              test_id:'111',
              test_name:'111',
              test_time:'111',
              test_score:'11',
              test_type:'11',
              create_time:'111',
              test_begin:'2018年12月10日',
              test_end:'2018年12月10日',
              test_tips:'111'
          }]
        }
      },
      methods:{
        getList: function (){
            this.loading=true;
            getPaperList({date:1}).then((res) => {
              this.tableData = res;
              //console.log(res);
              this.loading = false;
          });
        },
        handleClick: function(value){
            //alert(value.test_id);
          this.$router.push({name:'试卷详情',params:{test_id:value.test_id}})    
        },
        exportExcel:function (){
          this.$exportf('#list','试卷表');
        }
      },
      mounted() {
        this.getList();
      }
    }
  </script>
  <style lang="scss" scoped>
  
  </style>
  