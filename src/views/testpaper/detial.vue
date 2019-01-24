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
        <el-col class="line" :span="2" style="text-align:center">-</el-col>
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
        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="readonly" :loading="sub">确认修改</el-button>
        <el-button @click="toggle()">编辑信息</el-button>
      </el-form-item>
    </el-form>
  </el-tab-pane>

  <el-tab-pane label="试题添加">
    <!--工具条-->
		<el-col :span="24" v-show="status" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="addDomain(1)">单选题&nbsp<i class="el-icon-plus"></i></el-button>
				</el-form-item>
        <el-form-item>
					<el-button type="primary" @click="addDomain(2)">多选题&nbsp<i class="el-icon-plus"></i></el-button>
				</el-form-item>
        <el-form-item>
					<el-button type="primary" @click="addDomain(3)">判断题&nbsp<i class="el-icon-plus"></i></el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="sub_que" :loading="sub">提交</el-button>
				</el-form-item>
        <el-form-item>
					<el-button type="success" @click="open">从题库导入</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <h4>已有试题</h4>
    <!-- 添加试题 -->
    <el-card class="box-card"
      v-for="item in queForm" :key="item.index"
      >
      <div slot="header"> 
        <div class="tit">选择题</div>
				<el-input type="textarea" style="width:60%;" placeholder="请输入题目，最大150字" autosize max="150" v-model="item.question"></el-input>
				<el-button type="danger" style="float:right;" @click.prevent="remove(item)" v-show="status"><span class="el-icon-delete">&nbsp移除</span></el-button>			
			</div>
      <!-- 根据添加试题type类型选择显示内容 -->
      <div v-if="item.type==1" class="option">
        <div>
        <el-radio label="A" v-model="item.correct_option" >选项A </el-radio>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150"
        v-model="item.option1"
        ></el-input>
        </div>
        <div>
        <el-radio label="B" v-model="item.correct_option">选项B </el-radio>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150"
        v-model="item.option2"></el-input>
        </div>
        <div>
        <el-radio label="C" v-model="item.correct_option">选项C </el-radio>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150"
        v-model="item.option3"></el-input>
        </div>
        <div>
        <el-radio label="D" v-model="item.correct_option">选项D </el-radio>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150"
        v-model="item.option4"></el-input>
        </div>
        <div>
        参考答案：
        <el-radio-group v-model="item.correct_option">
          <el-radio-button label="A" v-model="item.correct_option"></el-radio-button>
          <el-radio-button label="B" v-model="item.correct_option"></el-radio-button>
          <el-radio-button label="C" v-model="item.correct_option"></el-radio-button>
          <el-radio-button label="D" v-model="item.correct_option"></el-radio-button>
        </el-radio-group>
      </div>
      </div>
      <div v-else-if="item.type==2"  class="option">
        <div>
        <el-checkbox label="A" v-model="item.correct_option">选项A </el-checkbox>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150" v-model="item.option1"></el-input>
        </div>
        <div>
        <el-checkbox label="B" v-model="item.correct_option">选项B </el-checkbox>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150" v-model="item.option2"></el-input>
        </div>
        <div>
        <el-checkbox label="C" v-model="item.correct_option">选项C </el-checkbox>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150" v-model="item.option3"></el-input>
        </div>
        <div>
        <el-checkbox label="D" v-model="item.correct_option">选项D </el-checkbox>
        <el-input type="textarea" style="width:40%;" placeholder="请输入试题，最大150字" autosize max="150" v-model="item.option4"></el-input>
        </div>
        <div>
        <el-checkbox-group v-model="item.correct_option">
          参考答案：
          <el-checkbox-button label="A"></el-checkbox-button>
          <el-checkbox-button label="B"></el-checkbox-button>
          <el-checkbox-button label="C"></el-checkbox-button>
          <el-checkbox-button label="D"></el-checkbox-button>
        </el-checkbox-group>
        </div>
      </div>
      <div v-else  class="option">
        <div>
        <el-radio label="A" v-model="item.correct_option">正确 </el-radio>
        </div>
        <div>
        <el-radio label="B" v-model="item.correct_option">错误 </el-radio>
        </div>
        <div>
        参考答案：
        <el-radio-group v-model="item.correct_option">
          <el-radio-button label="A">正确</el-radio-button>
          <el-radio-button label="B">错误</el-radio-button>
        </el-radio-group>
      </div>
      </div>
      <div>
        分值：
        <el-input type="number" style="width:30%;" placeholder="请输入1-150的数字" max="100" v-model="item.que_score"></el-input>
      </div>
    </el-card>
    <el-card v-show="status">
      <div>
					<el-button type="primary" @click="addDomain(1)">单选题&nbsp<i class="el-icon-plus"></i></el-button>
					<el-button type="primary" @click="addDomain(2)">多选题&nbsp<i class="el-icon-plus"></i></el-button>
					<el-button type="primary" @click="addDomain(3)">判断题&nbsp<i class="el-icon-plus"></i></el-button>
					<el-button type="primary" @click="sub_que" :loading="sub">提交</el-button>
          <el-button type="success" @click="open">从题库导入</el-button>
      </div>
    </el-card>
  </el-tab-pane>

  <!-- 试题添加遮罩 -->
    <el-dialog width="90%" title="选择试题" :visible.sync="dialogTableVisible">
			<el-tabs type="border-card">
        <!-- 利用父子组件传值方法获取试题 -->
			<el-tab-pane label="单选题">
        <!-- add_que为子组件传递的参数名称，sonCall为父组件回调方法，用于获取子组件传递的值 -->
        <IMP v-bind:type="1" v-on:add_que="sonCall"></IMP>
			</el-tab-pane>
			<el-tab-pane label="多选题">
				<IMP v-bind:type="2"></IMP>
			</el-tab-pane>
      <el-tab-pane label="判断题">
				<IMP v-bind:type="3"></IMP>
			</el-tab-pane>
		</el-tabs>
		</el-dialog>

  <el-tab-pane label="试卷发布">  
    <el-select
      v-model="value9"
      multiple
      filterable
      remote
      collapse-tags
      reserve-keyword
      placeholder="请输入班级名或id"
      :remote-method="remoteMethod"
      :loading="sub"
      style="width:50%">
    <el-option
      v-for="item in options4"
      :key="item.class_id"
      :label="item.class_name"
      :value="item.class_id">
    </el-option>
  </el-select>
  <el-button type="primary" @click="issue()">试题发布</el-button>
  <el-card class="box-card" style="margin-top:10px;">
    <div slot="header" class="clearfix">
      <span>已选班级</span>
      <el-button style="float: right; padding: 3px 0" type="text" >操作按钮</el-button>
    </div>
    <div v-for="item in value9" :key="item.vlaue" class="text item">
      {{'班级ID ' + item }}
    </div>
  </el-card>
  </el-tab-pane>
</el-tabs>
</template>

<script>
import {getpaperinfo,getpapermember,update,add_que,getclassinfo,paperissue,getclasslist} from '../../api/api'
import { log, callbackify } from 'util';
import IMP from '../public/import.vue'
  export default {
    data() {
      return {
        status:true,
        sub:false,
          //设置只读属性
        readonly:true,
        //存储试卷试题信息
        queForm:[],
        //存储试卷信息
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
        // 班级列表
        //查询列表
        options4: [],
        // 选中列表
        value9: [],
        //远程信息存储
        list: [],
        multipleSelection: [],
        // 遮罩
        dialogTableVisible: false,
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
              //标记发布状态，若已发布则无法修改试题
              this.status=!data[0].status;
            });
      },
      //切换编辑状态
      toggle(){
          this.readonly=!this.readonly;
      },
    //   更新试卷信息
    submitForm(formName) {
      this.sub=true;
        this.$refs[formName].validate((valid) => {
            var upParams = this.ruleForm;
            update(upParams).then(data => {
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
      // 删除选中的试题
      remove(item) {
        // var _this = this;
				this.$confirm('确认删除吗?', '提示', {
				 	type: 'warning'
				 }).then(() => {
				 	var index = this.queForm.indexOf(item)
          if (index !== -1) {
          this.queForm.splice(index, 1)
        }
				 }).catch(() => {
         });
      },
      addDomain(type) {
        var type=type;
        this.queForm.push({
          question:'啧啧啧啧啧啧',
          type: type,
          option1:'xx',
          option2:'xx',
          option3:'xx',
          option4:'xx',
          correct_option:['A'],
          que_score:'2'
          // key: Date.now()
        });
      },
      //加载已有试题
      loadque(){
        var params={
          type:3,
          id:this.$route.params.test_id
        };
        var params2={
          type:6,
          id:this.$route.params.test_id
        };
        getclasslist(params).then(data => {
          for(let i=0;i<data.length;i++){
            delete data[i].id;
            delete data[i].test_id;
            this.queForm.push(data[i]);
          }
        });
        getclasslist(params2).then(data => {
          for(let i=0;i<data.length;i++){
            this.value9.push(data[i].class_id);
          }
        });
      },
      //提交确认
			sub_que: function () {
        this.$confirm('将提交至数据库,请确认试题完善后提交,提交后试题不可修改，请慎重选择, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         var Params = this.queForm;
         //console.log(typeof(Params));
            add_que(Params).then(data => {
              console.log(data.code);
              let { code,msg } = data;
              if (code==1) {
                this.status=false,
                this.$message({
                  message:"创建成功",
                  type: 'success'
                });
              } else {
                this.$message({
                  message:"创建失败",
                  type:'error',
                });
              }
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
      },
      open(){
        this.dialogTableVisible = true;
      },
      //获取班级列表
      getclassinfo(){
        getclassinfo().then(data =>{
          for(let i=0;i<data.length;i++){
            delete data[i].class_time;
            delete data[i].class_join;
            delete data[i].class_desc;
          };
            this.list=data;
            //console.log(this.list);
        })
      },
      //班级添加发布的查询方法绑定
      remoteMethod(query) {
        if (query !== '') {
          var re = /^[0-9]+.?[0-9]*/;
          if(re.test(query)){
            this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.class_id.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
          }else{
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.class_name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
          }
        } else {
          this.options4 = this.list;
        }
      },
      // 试卷发布
      issue(){
        this.$confirm('将发布试题到选中班级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         var Params = this.value9;
         //console.log(Params);
            paperissue(Params).then(data => {
              let { code,msg } = data;
              if (code==1) {
                this.status=false,
                this.$message({
                  message:"提交成功",
                  type: 'success'
                });
              } else {
                this.$message({
                  message:"提交失败",
                  type:'error',
                });
              }
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
      },
      //父子组件传值回调
      sonCall:function(msg){
        //console.log(msg);
        for(let i=0;i<msg.length;i++){
        this.queForm.push({
          question:'啧啧啧啧啧啧',
          type: msg[i][0],
          option1:msg[i][1],
          option2:msg[i][2],
          option3:msg[i][3],
          option4:msg[i][4],
          correct_option:msg[i][5],
          que_score:'2'
          // key: Date.now()
        });
        }
      }
    },
    mounted() {
        this.getinfo();
        this.getclassinfo();
        this.loadque();
        sessionStorage.setItem("paper_id",this.$route.params.test_id);        
      },
      components:{IMP}
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
  .tit{
    float: left;
    height: 35px;
    line-height: 35px;
    margin-right: 5px;
  }
  .el-card__body div {
    padding-top: 3px;
}
.option div{
  height:40px;
  line-height:40px;
}
</style>