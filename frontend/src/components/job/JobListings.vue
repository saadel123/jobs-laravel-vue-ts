<script setup lang="ts">
import JobBrowser from '@/components/job/JobBrowser.vue'
</script>

<template>
    <JobBrowser jobs-url="/jobs" title="Browse Jobs" :show-manage="true" :filter-button="true" />
</template>
