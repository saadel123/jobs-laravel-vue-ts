<template>
   <JobListings ></JobListings>
</template>

<script setup lang="ts">
import JobListings from '@/components/JobListings.vue'
</script>

<style scoped>
.v-card {
    transition: transform 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
}
</style>