<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import JobListing from '@/components/job/JobListing.vue'
import type { Job } from '@/types/job'
import api from '@/api'
import { useSnackbar } from '@/composables/useSnackbar'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
    jobsUrl: string
    title?: string
    showManage?: boolean
    showButton?: boolean
    filterButton?: boolean
}>()

const route = useRoute()
const router = useRouter()

const isMyJobsPage = computed(() => route.path === '/profile/jobs')

const goToAddJob = () => {
    router.push('/jobs/add')
}


const { trigger } = useSnackbar()
const jobs = ref<Job[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const selectedType = ref('')
const jobTypes = ['Full-Time', 'Part-Time', 'Remote', 'Internship']

const filteredJobs = computed(() => {
    let result = jobs.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.company.name.toLowerCase().includes(query)
        )
    }

    if (selectedType.value) {
        result = result.filter(job => job.type === selectedType.value)
    }

    return result
})

const resetFilters = () => {
    searchQuery.value = ''
    selectedType.value = ''
}

onMounted(async () => {
    try {
        const response = await api.get<Job[]>(props.jobsUrl)
        jobs.value = response.data
    } catch (error) {
        console.error('Error fetching jobs:', error)
        trigger('Failed to load jobs', 'error')
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <v-sheet class="py-10">
        <v-container>
            <h2 class="text-h4 font-weight-bold mb-6 text-center"
                :class="$vuetify.theme.current.dark ? 'text-blue-lighten-2' : 'text-green-darken-2'">
                {{ title || 'Browse Jobs' }}
            </h2>

            <!-- Filters -->
            <v-row class="mb-6" v-if="filterButton !== false && filteredJobs.length !== 0">
                <v-col cols="12" md="6">
                    <v-text-field v-model="searchQuery" label="Search jobs..." variant="outlined"
                        prepend-inner-icon="mdi-magnify" clearable hide-details />
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model="selectedType" :items="jobTypes" label="Filter by type" variant="outlined"
                        clearable hide-details />
                </v-col>
            </v-row>

            <!-- Job Results -->
            <v-row class="justify-center">
                <v-col cols="12" lg="12">
                    <!-- Skeletons -->
                    <v-row v-if="isLoading && jobs.length === 0">
                        <v-col cols="12" sm="6" md="4" v-for="n in 6" :key="n">
                            <v-skeleton-loader type="card" class="pa-4" height="250" animation="wave" />
                        </v-col>
                    </v-row>

                    <!-- No Results -->
                    <v-card v-else-if="filteredJobs.length === 0" class="pa-6 text-center">
                        <v-icon size="64" color="grey">mdi-briefcase-off</v-icon>
                        <h3 class="text-h5 mt-4">No jobs found</h3>
                        <p class="text-body-1 mt-2">
                            {{ isMyJobsPage ? 'Try adding a new job' : 'Try adjusting your search filters' }}
                        </p>

                        <v-btn color="primary" variant="text" class="mt-4"
                            @click="isMyJobsPage ? goToAddJob() : resetFilters()">
                            {{ isMyJobsPage ? 'Add Job' : 'Reset Filters' }}
                        </v-btn>
                    </v-card>


                    <!-- Jobs -->
                    <v-row v-else>
                        <JobListing v-for="job in filteredJobs" :key="job.id" :job="job" :show-manage="showManage" />
                    </v-row>
                </v-col>
            </v-row>

            <!-- View All Button -->
            <v-container v-if="showButton && filteredJobs.length > 0" class="text-center">
                <v-btn color="primary" variant="elevated" class="px-6 py-4" size="large" to="/jobs">
                    View All Jobs
                    <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>
            </v-container>
        </v-container>
    </v-sheet>
</template>
