<script setup lang="ts">
import {RouterView} from 'vue-router'

</script>

<template>
  <RouterView />
  <el-backtop :right="100" :bottom="100" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  background-color: #F5F5F5;
}

</style>
