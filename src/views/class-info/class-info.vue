<template>
<div id="app">
    <el-row class="container" type="flex" justify="center">
    <el-col :span="4" class="logo">班级空间</el-col>
    <el-col :span="16">
        <!-- @select处理路由携带参数跳转 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <!-- index对应跳转的子路由名称（index作为name跳转参数传递），不可随意变更 -->
            <el-menu-item index="info">班级信息</el-menu-item>
            <el-menu-item index="member">班级成员</el-menu-item>
            <el-menu-item index="test">班级试卷</el-menu-item>
        </el-menu>
    </el-col>
</el-row>
    <el-row type="flex" justify="center">
        <el-col :span="18">
            <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">返回首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级空间</el-breadcrumb-item>
            <el-breadcrumb-item >{{activename}}</el-breadcrumb-item>
            </el-breadcrumb>
            </div>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-col>
    </el-row>
</div>

</template>

<script>
export default {
    data() {
      return {
        activeIndex: 'info',
        activename:'info',
      };
    },
    methods: {
      handleSelect(key) {
          this.activename=key;
          this.$router.push({
            name:key,
            params:{
                id:this.$route.params.id
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.container{
    background-color:#eef1f6;
    .logo{
        height:60px;
        line-height: 60px;
        font-size: 30px;
        overflow: hidden;
        color: rgb(74, 111, 214);
        }  
}
.bread{
    height: 25px;
    margin: 20px 0;
    border-bottom: 1px dashed gray;
    span{
        font-size:16px;
    }
}

</style>
