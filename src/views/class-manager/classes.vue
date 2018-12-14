<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="班级名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="班级 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="加入方式">
            <span>{{ props.row.way }}</span>
          </el-form-item>
          <el-form-item label="成员数">
            <span>{{ props.row.member }}</span>
          </el-form-item>
          <el-form-item label="班级描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="班级ID" prop="id">
    </el-table-column>
    <el-table-column label="班级名称" prop="name">
    </el-table-column>
    <el-table-column label="创建时间" prop="time">
    </el-table-column>
	<el-table-column label="加入方式" prop="way">
    </el-table-column>
	<el-table-column label="班级成员" prop="member">
    </el-table-column>
	<el-table-column label="描述" prop="desc">
    </el-table-column>
	<el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">班级管理</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
  </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: '12987122',
            name: '测试班',
            time:'2018年11月27日16:34:24',
            way:'允许任何人加入',
            member:33,
            desc: '测试班',
          },
          {
            id: '12987122',
            name: '测试班',
            time:'2018年11月27日16:34:24',
            way:'允许任何人加入',
            member:33,
            desc: '测试班',
          },
          {
              id: '12987122',
              name: '测试班',
              time:'2018年11月27日16:34:24',
              way:'测试班',
              member:33,
              desc: '测试班',
          },
          {
            id: '12987122',
            name: '测试班',
            time:'2018年11月27日16:34:24',
            way:'允许任何人加入',
            member:33,
            desc: '测试班',
          },]
        }
	},
    methods: {
      handleEdit(index, row) {
		//console.log(index, row.id);
		this.$router.push({name:'info',params:{id:row.id}})
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>