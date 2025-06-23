<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import JobListing from './JobListing.vue'
import type { Job } from "@/types/job"
import api from '../api';

const props = defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    },
    filterButton: {
        type: Boolean,
        default: true
    }
})

const jobs = ref<Job[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedType = ref('')

const jobTypes = ['Full-Time', 'Part-Time', 'Remote', 'Internship']

const filteredJobs = computed(() => {
    let result = jobs.value

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.company.name.toLowerCase().includes(query)
        )
    }

    // Apply type filter
    if (selectedType.value) {
        result = result.filter(job => job.type === selectedType.value)
    }

    // Apply limit if specified
    return props.limit ? result.slice(0, props.limit) : result
})

const resetFilters = () => {
    searchQuery.value = ''
    selectedType.value = ''
}

onMounted(async () => {
    try {
        //No need for axios now because am using api with pinia auth
        // const response = await axios.get("/api/jobs")
        const response = await api.get<Job[]>("/jobs")
        jobs.value = response.data
    } catch (error) {
        console.error("Error Fetching jobs:" + error)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <v-sheet
        class="py-10">
        <v-container>
            <h2 class="text-h3 font-weight-bold mb-6 text-center"
                :class="$vuetify.theme.current.dark ? 'text-blue-lighten-2' : 'text-green-darken-2'">
                Browse Jobs
            </h2>

            <!-- Search and Filter Bar -->
            <v-row class="mb-6" v-if="filterButton">
                <v-col cols="12" md="6">
                    <v-text-field v-model="searchQuery" label="Search jobs..." variant="outlined"
                        prepend-inner-icon="mdi-magnify" clearable hide-details></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model="selectedType" :items="jobTypes" label="Filter by type" variant="outlined"
                        clearable hide-details></v-select>
                </v-col>
            </v-row>

            <v-row class="justify-center">
                <v-col cols="12" lg="12">
                    <!-- Loading State -->
                    <v-row v-if="isLoading && jobs.length === 0">
                        <v-col cols="12" sm="6" md="4" v-for="n in 6" :key="n">
                            <v-skeleton-loader type="card" class="pa-4" height="250"
                                animation="wave"></v-skeleton-loader>
                        </v-col>
                    </v-row>

                    <!-- Empty State -->
                    <v-card v-else-if="filteredJobs.length === 0" class="pa-6 text-center">
                        <v-icon size="64" color="grey">mdi-briefcase-off</v-icon>
                        <h3 class="text-h5 mt-4">No jobs found</h3>
                        <p class="text-body-1 mt-2">Try adjusting your search filters</p>
                        <v-btn color="primary" variant="text" @click="resetFilters" class="mt-4">
                            Reset Filters
                        </v-btn>
                    </v-card>

                    <!-- Job Listings -->
                    <v-row v-else>
                        <JobListing v-for="job in filteredJobs" :key="job.id" :job="job" />
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-if="showButton && filteredJobs.length > 0" class="text-center">
            <v-btn color="primary" variant="elevated" class="px-6 py-4" size="large" to="/jobs">
                View All Jobs
                <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
        </v-container>
    </v-sheet>
</template>

<style scoped>
.v-sheet {
    transition: background-color 0.3s ease;
}
</style>