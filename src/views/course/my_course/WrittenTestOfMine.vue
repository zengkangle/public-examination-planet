<script setup lang="ts">
import {ref} from "vue";

let flag = ref("my")

import CourseCard from "@/components/CourseCard.vue";
</script>

<template>
    <div class="card-list">
        <CourseCard class="card" :flag="flag"/>
        <CourseCard class="card" :flag="flag"/>
        <CourseCard class="card" :flag="flag"/>
        <CourseCard class="card" :flag="flag"/>
        <CourseCard class="card" :flag="flag"/>
        <CourseCard class="card" :flag="flag"/>
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