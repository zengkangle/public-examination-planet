<script setup lang="ts">

import TeacherCard from "@/components/TeacherCard.vue";
import {computed, ref} from "vue";
import request from "@/utils/request";

/**
 * 分页+无限滚动
 */
const teacherList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
})
let disabled = computed(() => {
    return teacherList.value.length == pageMsg.value.total;
})
const load = () => {
    pageMsg.value.currentPage++
    getTeacherListScroll()
}
function getTeacherListScroll(){
    request.get(
      "/teacher/getSimpleTeacherList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            teacherList.value = teacherList.value.concat(res.data.records)
            pageMsg.value.total = res.data.total
        }
    })
}

</script>

<template>
<div class="card-list" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
    <TeacherCard v-for="teacher in teacherList" :key="teacher.teacherId" :teacher="teacher"/>
</div>

</template>

<style scoped>
.card-list{
  margin: 0 auto;
  width: 1360px;
  padding-top: 100px;
	display: flex;
	flex-wrap: wrap;
}

</style>