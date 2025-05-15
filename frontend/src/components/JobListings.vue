<script setup lang="ts">
//Here am consuming static data from a json file
import { ref, computed, onMounted } from "vue"
import JobListing from './JobListing.vue'
import axios from 'axios'
import type { Job } from "@/types/job"

// Props
const props = defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

const jobs = ref<Job[]>([])
const isLoading = ref(true) // Start loading as true

const filteredJobs = computed(() => {
    return props.limit ? jobs.value.slice(0, props.limit) : jobs.value
})

onMounted(async () => {
    try {
        const response = await axios.get("/api/jobs")
        jobs.value = response.data
    } catch (error) {
        console.error("Error Fetching jobs:" + error)
    } finally {
        isLoading.value = true
    }
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
                        <!-- Skeleton loaders shown during initial load -->
                        <template v-if="isLoading && jobs.length === 0">
                            <v-col cols="4" v-for="n in 6" :key="n">
                                <v-skeleton-loader type="card" class="pa-4" animation="wave" />
                            </v-col>
                        </template>

                        <!-- Real job listings -->
                        <template v-else>
                            <JobListing v-for="job in filteredJobs" :key="job.id" :job="job" />
                        </template>
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
