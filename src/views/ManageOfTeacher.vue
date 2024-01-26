<script setup lang="ts">
import SideBarForTeacher from "@/components/SideBarForTeacher.vue";
</script>

<template>
    <div class="main">
        <SideBarForTeacher/>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    width: 1400px;
    padding-top: 60px;
    margin-left: 240px;
}
</style>