<template>
<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i> 试卷信息</span>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;" @submit.prevent="onSubmit" >
	<el-form-item label="试题名称" prop="name">
		<el-input v-model="ruleForm.test_name" :disabled="readonly"></el-input>
	</el-form-item>
  <el-form-item label="考试时长" prop="time">
		<el-select v-model="ruleForm.test_time" :disabled="readonly" placeholder="单位/分钟">
		<el-option label="15分钟" value="15"></el-option>
		<el-option label="45分钟" value="45"></el-option>
    <el-option label="90分钟" value="90"></el-option>
    <el-option label="120分钟" value="120"></el-option>
    <el-option label="150分钟" value="150"></el-option>
		</el-select>
	</el-form-item>
	<el-form-item label="试卷类型" prop="type">
		<el-select v-model="ruleForm.test_type" :disabled="readonly" placeholder="请选择试卷类型">
		<el-option label="类型一" value="1"></el-option>
		<el-option label="类型二" value="2"></el-option>
    <el-option label="类型三" value="3"></el-option>
		</el-select>
	</el-form-item>
	<el-form-item label="有效期" required>
		<el-col :span="11">
		<el-form-item prop="begin">
			<el-date-picker
       type="date" 
       placeholder="开始日期" 
       v-model="ruleForm.test_begin"
      format="yyyy 年 MM 月 dd 日"
      style="width: 100%;"
      :disabled="readonly"></el-date-picker>
		</el-form-item>
		</el-col>
		<el-col class="line" :span="2">-</el-col>
		<el-col :span="11">
		<el-form-item prop="end">
			<el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.test_end" style="width: 100%;"
      format="yyyy 年 MM 月 dd 日" :disabled="readonly"></el-date-picker>
		</el-form-item>
		</el-col>
	</el-form-item>
	<el-form-item label="试题分值" prop="score">
		<el-radio-group v-model="ruleForm.test_score" :disabled="readonly">
    <el-radio label="60">60分</el-radio>
		<el-radio label="100">100分</el-radio>
		<el-radio label="120">120分</el-radio>
    <el-radio label="150">150分</el-radio>
    <el-radio label="0">不确定分值</el-radio>
		</el-radio-group>
	</el-form-item>
	<el-form-item label="相关备注" prop="desc">
		<el-input type="textarea" v-model="ruleForm.test_tips" :disabled="readonly"></el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="submitForm('ruleForm')" :disabled="readonly">确认修改</el-button>
		<el-button @click="toggle()">编辑信息</el-button>
	</el-form-item>
	</el-form>
  </el-tab-pane>
  <el-tab-pane label="参考人员">
      <div class="table">
        <h3>参与考试人员</h3>
        <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
    <div style="margin-top: 20px">
        <div style="float:left;">
        <el-button type="primary">打印选中<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    <div style="float:right">
        分页按钮。。
    </div>
    </div>
  </div>
  </el-tab-pane>
  <el-tab-pane label="试题管理">已发布试题无法变更</el-tab-pane>
  <el-tab-pane label="定时任务">定时任务</el-tab-pane>
</el-tabs>
</template>

<script>
import {getpaperinfo,getpapermember,update} from '../../api/api'
  export default {
    data() {
      return {
          //设置只读属性
        readonly:true,
        paperinfo:[],
        ruleForm: {
          msg:"暂时无法获取数据"
        },
        rules: {
          name: [
            { required: true, message: '请输入试题名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入考试时长，以分钟为单位', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择试题类型', trigger: 'blur' }
          ],
          begin: [
            { type: 'date', required: true, message: '请选择开始时间', trigger: 'blur' }
          ],
          end: [
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'blur' }
          ],
         score: [
            { required: true, message: '请选择具体分值，不确定请选择最后一项', trigger: 'blur' }
          ],
          desc: [
            { max:150, message: '最多输入150个字符', trigger: 'blur' }
          ]
        },
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //获取试卷信息
      getinfo(){
          //获取传递的试卷id,封装成参数发送给后台
        var Params = {id:this.$route.params.test_id};

            getpaperinfo(Params).then(data => {
              this.ruleForm=data[0];
            });
      },
      //切换编辑状态
      toggle(){
          this.readonly=!this.readonly;
      },
    //   更新试卷信息
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            var upParams = this.ruleForm;
            update(upParams).then(data => {
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
    },
    mounted() {
        this.getinfo();
        sessionStorage.setItem("paper_id",this.$route.params.test_id);
      }
  }
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
 
  .bg-purple {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;}
  
</style>