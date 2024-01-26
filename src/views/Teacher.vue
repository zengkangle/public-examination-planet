<script setup lang="ts">

import TeacherCard from "@/components/TeacherCard.vue";
</script>

<template>
<div class="card-list">
    <TeacherCard/>
    <TeacherCard/>
    <TeacherCard/>
    <TeacherCard/>
    <TeacherCard/>
    <TeacherCard/>
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