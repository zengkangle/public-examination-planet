<script setup lang="ts">

import CourseCard from "@/components/CourseCard.vue";
import request from "@/utils/request";
import {computed, ref} from "vue";

/**
 * 分页+无限滚动
 */
const courseList = ref([])
const pageMsg = ref({
	currentPage:0,
	pageSize:9,
	total:null,
	courseType:'公考面试'
})
let disabled = computed(() => {
	return courseList.value.length == pageMsg.value.total;
})
const load = () => {
	pageMsg.value.currentPage++
	getCourseListScroll()
}
function getCourseListScroll(){
	request.get(
		"/course/getCourseList",
		{
			params:pageMsg.value
		}
	).then(res => {
		if (res.code === '200'){
			courseList.value = courseList.value.concat(res.data.records)
			pageMsg.value.total = res.data.total
		}
	})
}
</script>

<template>
    <div class="card-list" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <CourseCard class="card" v-for="course in courseList" :key="course.courseId" :course="course"/>
        <div v-if="courseList.length===0" style="font-size: 27px;width: 100%;text-align: center;">抱歉,此列表暂无课程~</div>
    </div>

</template>

<style scoped>
.card-list{
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
}
.card{
    margin-right: 40px;
    margin-bottom: 40px;
}
</style>