<script setup lang="ts">

import CourseCard from "@/components/CourseCard.vue";
</script>

<template>
	<div class="card-list">
      <CourseCard class="card"/>
      <CourseCard class="card"/>
      <CourseCard class="card"/>
      <CourseCard class="card"/>
      <CourseCard class="card"/>
      <CourseCard class="card"/>
      <CourseCard class="card"/>
      <CourseCard class="card"/>
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