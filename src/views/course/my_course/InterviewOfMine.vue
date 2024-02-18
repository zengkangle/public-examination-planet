<script setup lang="ts">
import {computed, ref} from "vue";
import CourseCard from "@/components/CourseCard.vue";
import request from "@/utils/request";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/store/user";

const userStore = useUserStore()
const {userId} = storeToRefs(userStore)

let flag = ref("my")

/**
 * 分页+无限滚动
 */
const myCourseList = ref([])
const pageMsg = ref({
	currentPage:0,
	pageSize:10,
	total:null,
	courseType:'公考面试',
	userId:userId,
})
let disabled = computed(() => {
	return myCourseList.value.length == pageMsg.value.total;
})
const load = () => {
	pageMsg.value.currentPage++
	getCourseListScroll()
}
function getCourseListScroll(){
	request.get(
		"/course/getMyCourseList",
		{
			params:pageMsg.value
		}
	).then(res => {
		if (res.code === '200'){
			myCourseList.value = myCourseList.value.concat(res.data.records)
			console.log(myCourseList.value)
			pageMsg.value.total = res.data.total
		}
	})
}
</script>

<template>
    <div class="card-list" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <CourseCard class="card" :flag="flag" v-for="course in myCourseList" :key="course.courseId" :course="course"/>
        <div v-if="myCourseList.length===0" style="font-size: 27px;width: 100%;text-align: center;">抱歉,此列表暂无课程~</div>
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