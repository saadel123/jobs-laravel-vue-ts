<script setup lang="ts">
import jobsData from '@/jobs.json'
import { ref } from "vue";
import JobListing from './JobListing.vue';

// Access the jobs array from the JSON data
const jobs = ref(jobsData.jobs);
// console.log(jobs.value)
defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
});
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
                        <JobListing v-for="job in jobs.slice(limit || jobs.length)" :key="job.id" :job="job">
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