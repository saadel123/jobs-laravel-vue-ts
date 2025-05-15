<script setup lang="ts">
import JobListings from '@/components/JobListings.vue'
</script>

<template>
   <JobListings ></JobListings>
</template>

<style scoped>
.v-card {
    transition: transform 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
}
</style>