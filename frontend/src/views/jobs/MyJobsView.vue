<script setup lang="ts">
import JobBrowser from '@/components/job/JobBrowser.vue'
</script>

<template>
    <JobBrowser jobs-url="/profile/jobs" title="My Job Listings" :show-manage="true" :filter-button="true" />
</template>
