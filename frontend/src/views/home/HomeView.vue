<script setup lang="ts">
import HomeCard from "@/components/ui/HomeCard.vue"
import JobListings from "@/components/job/JobListings.vue";
</script>

<template>
    <v-container class="pa-0">
        <HomeCard></HomeCard>
        <!-- Browse Jobs Section -->
        <JobListings :limit="3" :showButton="true" :filterButton="false"></JobListings>
        <!-- View All Jobs Button -->
    </v-container>
</template>


<style scoped>
.v-card {
    transition: transform 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
}
</style>