<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Job } from "@/types/job"
import { useRoute, useRouter } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import { useSnackbar } from '@/composables/useSnackbar'
import api from '../api'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { getJobTypeColor } from '@/utils/job';


const theme = useTheme()
const { trigger } = useSnackbar()
const route = useRoute()
const router = useRouter()
const job = ref<Job | null>(null)
const isLoading = ref(true)
const jobId = route.params.id
const auth = useAuthStore()

const deleteJob = async () => {
    try {
        const confirmed = await confirmDialog(
            'Delete Job',
            'Are you sure you want to delete this job?',
            'error'
        )
        if (confirmed) {
            await api.delete(`/jobs/${jobId}`)
            trigger("Job deleted successfully", "error")
            router.push('/jobs')
        }
    } catch (error) {
        console.error('Error deleting job:', error)
        trigger("Failed to delete job", "error")
    }
}

const confirmDialog = (title: string, message: string, type: string) => {
    return new Promise<boolean>((resolve) => {
        // In a real app, replace with a proper dialog component
        const result = window.confirm(`${title}\n${message}`)
        resolve(result)
    })
}

const isOwner = computed(() => {
    return job.value?.company?.user_id === auth.user?.id
})

onMounted(async () => {
    try {
        await auth.fetchUser();
        //Type-Safety in API Response
        const response = await api.get<Job>(`/jobs/${jobId}`);
        job.value = response.data;
    } catch (error) {
        console.error("Error fetching job:", error);
        trigger("Failed to load job details", "error");
        router.push('/jobs');
    } finally {
        isLoading.value = false;
    }
});

</script>

<template>
    <v-container class="py-6">
        <BackButton />

        <v-sheet class="py-10 rounded-lg">
            <v-row>
                <!-- Main Content Column -->
                <v-col cols="12" md="8" class="pe-md-6">
                    <!-- Loading State -->
                    <template v-if="isLoading">
                        <v-skeleton-loader type="card" class="mb-6" height="120"></v-skeleton-loader>
                        <v-skeleton-loader type="article" class="mb-6"></v-skeleton-loader>
                        <v-skeleton-loader type="article" class="mb-6"></v-skeleton-loader>
                    </template>

                    <!-- Job Content -->
                    <template v-else-if="job">
                        <v-card class="mb-6"
                            :class="{ 'hover-card-dark': theme.global.current.value.dark, 'hover-card': !theme.global.current.value.dark }">
                            <v-card-text>
                                <v-chip small :color="getJobTypeColor(job.type)" class="mb-4" text-color="white">
                                    {{ job.type }}
                                </v-chip>

                                <h1 class="text-h4 font-weight-bold mb-2">{{ job.title }}</h1>

                                <div class="d-flex align-center mb-4">
                                    <v-icon
                                        :color="theme.global.current.value.dark ? 'orange-lighten-2' : 'orange-darken-2'"
                                        class="mr-2">
                                        mdi-map-marker
                                    </v-icon>
                                    <span
                                        :class="theme.global.current.value.dark ? 'text-orange-lighten-2' : 'text-orange-darken-2'">
                                        {{ job.location }}
                                    </span>
                                </div>
                            </v-card-text>
                        </v-card>

                        <v-card
                            :class="{ 'hover-card-dark': theme.global.current.value.dark, 'hover-card': !theme.global.current.value.dark }">
                            <v-card-title class="d-flex align-center">
                                <v-icon :color="theme.global.current.value.dark ? 'blue-lighten-2' : 'green-darken-2'"
                                    class="mr-2">
                                    mdi-text-box
                                </v-icon>
                                <span>Job Description</span>
                            </v-card-title>

                            <v-card-text>
                                <p class="text-body-1">{{ job.description }}</p>

                                <v-divider class="my-4" />

                                <div class="d-flex align-center">
                                    <v-icon
                                        :color="theme.global.current.value.dark ? 'blue-lighten-2' : 'green-darken-2'"
                                        class="mr-2">
                                        mdi-cash
                                    </v-icon>
                                    <span class="text-h6">{{ job.salary }} / year</span>
                                </div>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-col>

                <!-- Sidebar Column -->
                <v-col cols="12" md="4">
                    <!-- Loading State -->
                    <template v-if="isLoading">
                        <v-skeleton-loader type="card-avatar" class="mb-6"></v-skeleton-loader>
                        <v-skeleton-loader type="card" class="mb-6"></v-skeleton-loader>
                    </template>

                    <!-- Company Info -->
                    <template v-else-if="job && job.company">
                        <v-card
                            :class="{ 'hover-card-dark': theme.global.current.value.dark, 'hover-card': !theme.global.current.value.dark }"
                            class="mb-6">
                            <v-card-title class="d-flex align-center">
                                <v-icon :color="theme.global.current.value.dark ? 'blue-lighten-2' : 'green-darken-2'"
                                    class="mr-2">
                                    mdi-office-building
                                </v-icon>
                                <span>Company Info</span>
                            </v-card-title>

                            <v-card-text>
                                <h2 class="text-h5 font-weight-bold mb-2">{{ job.company.name }}</h2>
                                <p class="text-body-1 mb-4">{{ job.company.description }}</p>

                                <v-divider class="my-4" />

                                <div class="mb-4">
                                    <div class="text-caption font-weight-bold mb-1">Contact Email</div>
                                    <v-chip
                                        :color="theme.global.current.value.dark ? 'blue-darken-3' : 'green-lighten-3'"
                                        class="w-full justify-start" label>
                                        <v-icon small class="mr-2">mdi-email</v-icon>
                                        {{ job.company.contact_email }}
                                    </v-chip>
                                </div>

                                <div>
                                    <div class="text-caption font-weight-bold mb-1">Contact Phone</div>
                                    <v-chip
                                        :color="theme.global.current.value.dark ? 'blue-darken-3' : 'green-lighten-3'"
                                        class="w-full justify-start" label>
                                        <v-icon small class="mr-2">mdi-phone</v-icon>
                                        {{ job.company.contact_phone || 'Not provided' }}
                                    </v-chip>
                                </div>
                            </v-card-text>
                        </v-card>

                        <!-- Manage Job -->
                        <v-card v-if="isOwner"
                            :class="{ 'hover-card-dark': theme.global.current.value.dark, 'hover-card': !theme.global.current.value.dark }">
                            <v-card-title class="d-flex align-center">
                                <v-icon :color="theme.global.current.value.dark ? 'blue-lighten-2' : 'green-darken-2'"
                                    class="mr-2">
                                    mdi-cog
                                </v-icon>
                                <span>Manage Job</span>
                            </v-card-title>

                            <v-card-text>
                                <v-btn :to="`/jobs/edit/${job.id}`" block color="primary" variant="flat" class="mb-4"
                                    prepend-icon="mdi-pencil">
                                    Edit Job
                                </v-btn>

                                <v-btn @click="deleteJob" block color="error" variant="flat" prepend-icon="mdi-delete">
                                    Delete Job
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<style scoped>
.hover-card {
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.hover-card-dark {
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.hover-card:hover,
.hover-card-dark:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.hover-card-dark:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

.v-sheet {
    transition: background-color 0.3s ease;
}
</style>