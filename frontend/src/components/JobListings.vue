<script setup lang="ts">
import jobsData from '@/jobs.json'
import { ref, computed } from "vue"
import JobListing from './JobListing.vue'

// Props
const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
})

// Reactive jobs data
const jobs = ref(jobsData.jobs)

// Computed filtered jobs
const filteredJobs = computed(() => {
  return props.limit ? jobs.value.slice(0, props.limit) : jobs.value
})
</script>


<template>
    <v-sheet color="green-lighten-5" class="py-10">
        <v-container>
            <h2 class="text-h3 font-weight-bold text-green-darken-2 mb-6 text-center">
                Browse Jobs
            </h2>
            <v-row class="justify-center">
                <v-col cols="12" md="10">
                    <v-row>
                        <JobListing v-for="job in filteredJobs" :key="job.id" :job="job">
                        </JobListing>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
    <v-container v-if="showButton" class="text-center">
        <v-btn color="black" variant="elevated" class="text-white px-6 py-4" size="large" to="/jobs">
            View All Jobs
        </v-btn>
    </v-container>
</template>