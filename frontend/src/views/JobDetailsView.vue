<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Job } from "@/types/job"
import { useRoute } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import router from '@/router';
import { useSnackbar } from '@/composables/useSnackbar';
import api from '../api';


const { trigger } = useSnackbar();

const job = ref<Job | null>(null)
const isLoading = ref(true)

const route = useRoute()
const jobId = route.params.id


const deleteJob = async () => {
    try {
        const confirm = window.confirm('Are you sure you want to delete this job?')
        if (confirm) {
            const response = await api.delete(`/jobs/${jobId}`)
            trigger("Job deleted successfully", "red");
            router.push(`/jobs`);
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        trigger("Job not deleted", "red");
    }
}
onMounted(async () => {
    try {
        const response = await api.get(`/jobs/${jobId}`)
        job.value = response.data
    } catch (error) {
        console.error("Error fetching job: " + error)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <v-container class="py-6">
        <BackButton />
        <v-row class="bg-green-50 py-10">
            <v-col cols="12" md="8">
                <!-- Loading Skeleton -->
                <template v-if="isLoading">
                    <v-skeleton-loader type="card" class="mb-4" height="200px" />
                    <v-skeleton-loader type="paragraph" class="mb-4" />
                    <v-skeleton-loader type="paragraph" class="mb-4" />
                </template>

                <!-- Main Job Content -->
                <template v-else-if="job">
                    <v-card class="mb-6">
                        <v-card-text>
                            <div class="text-center md:text-left">
                                <div class="text-grey-500 mb-4">{{ job.type }}</div>
                                <h1 class="display-1 font-weight-bold">{{ job.title }}</h1>
                                <div class="d-flex justify-center md:justify-start align-center mb-4">
                                    <v-icon color="orange" small>mdi-map-marker</v-icon>
                                    <p class="text-orange-700 ms-2">{{ job.location }}</p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-card>
                        <v-card-title class="green--text text-h5">Job Description</v-card-title>
                        <v-card-text>
                            <p class="text-body-1">{{ job.description }}</p>

                            <v-divider class="my-4" />

                            <v-card-title class="green--text text-h5">Salary</v-card-title>
                            <p>{{ job.salary }}</p>
                        </v-card-text>
                    </v-card>
                </template>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" md="4">
                <!-- Loading Skeleton -->
                <template v-if="isLoading">
                    <v-skeleton-loader type="card-avatar" class="mb-4" />
                </template>

                <!-- Company Info -->
                <template v-else-if="job && job.company">
                    <v-card>
                        <v-card-title class="text-xl font-weight-bold">Company Info</v-card-title>
                        <v-card-text>
                            <h2 class="text-2xl">{{ job.company.name }}</h2>
                            <p class="text-body-1">{{ job.company.description }}</p>

                            <v-divider class="my-4" />

                            <h3 class="text-xl">Contact Email:</h3>
                            <v-chip class="my-2" color="green" dark>{{ job.company.contact_email }}</v-chip>

                            <h3 class="text-xl">Contact Phone:</h3>
                            <v-chip class="my-2" color="green" dark>{{ job.company.contact_phone }}</v-chip>
                        </v-card-text>
                    </v-card>

                    <!-- Manage Job -->
                    <v-card class="mt-6">
                        <v-card-title class="text-xl font-weight-bold">Manage Job</v-card-title>
                        <v-card-text>
                            <v-btn :to="`/jobs/edit/${job.id}`" color="green" class="w-full me-4" large>Edit Job</v-btn>
                            <v-btn @click="deleteJob" color="red" class="w-full" large>Delete Job</v-btn>
                        </v-card-text>
                    </v-card>
                </template>
            </v-col>
        </v-row>
    </v-container>
</template>
