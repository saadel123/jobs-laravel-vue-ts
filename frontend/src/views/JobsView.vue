<template>
    <v-container class="pa-0">
        <!-- Filter Jobs -->
        <v-sheet color="green-lighten-5" class="py-4">
            <v-container>
                <v-text-field v-model="searchQuery" variant="outlined" placeholder="Filter jobs..." hide-details
                    single-line density="comfortable" bg-color="white" class="rounded-lg"></v-text-field>
            </v-container>
        </v-sheet>

        <!-- All Jobs -->
        <v-sheet color="green-lighten-5" class="py-10">
            <v-container>
                <h2 class="text-h3 font-weight-bold text-green-darken-2 mb-6 text-center">
                    Browse Jobs
                </h2>
                <v-row>
                    <v-col v-for="job in filteredJobs" :key="job.id" cols="12" md="4" class="d-flex">
                        <v-card class="rounded-xl flex-grow-1" elevation="2">
                            <v-card-text class="pa-4">
                                <div class="mb-6">
                                    <div class="text-grey-darken-1 mb-2">{{ job.type }}</div>
                                    <h3 class="text-h6 font-weight-bold">{{ job.title }}</h3>
                                </div>

                                <div class="mb-5 text-body-1">
                                    {{ job.description }}
                                </div>

                                <h3 class="text-green-darken-2 mb-2">{{ job.salary }}</h3>

                                <v-divider class="mb-5"></v-divider>

                                <div class="d-flex justify-space-between align-center">
                                    <div class="text-orange-darken-2">
                                        <v-icon icon="mdi-map-marker" class="mr-1"></v-icon>
                                        {{ job.location }}
                                    </div>
                                    <v-btn color="green-darken-2" variant="flat" class="text-white"
                                        :to="`/jobs/${job.id}`" size="small">
                                        Read More
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

const jobs = [
    {
        id: 1,
        title: 'Senior Vue Developer',
        type: 'Full-Time',
        location: 'Boston, MA',
        description: 'We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript...',
        salary: '$70 - $80K / Year'
    },
    {
        id: 2,
        title: 'Front-End Engineer (Vue)',
        type: 'Remote',
        location: 'Miami, FL',
        description: 'Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion...',
        salary: '$70K - $80K / Year'
    },
    {
        id: 3,
        title: 'Vue.js Developer',
        type: 'Remote',
        location: 'Brooklyn, NY',
        description: 'Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference...',
        salary: '$70K - $80K / Year'
    },
    {
        id: 4,
        title: 'Vue Front-End Developer',
        type: 'Part-Time',
        location: 'Phoenix, AZ',
        description: 'Join our team as a Part-Time Front-End Developer in beautiful Phoenix, AZ. We are looking for a self-motivated individual with a passion...',
        salary: '$60 - $70K / Year'
    },
    {
        id: 5,
        title: 'Full Stack Vue Developer',
        type: 'Full-Time',
        location: 'Atlanta, GA',
        description: 'Exciting opportunity for a Full-Time Front-End Developer in bustling Atlanta, GA. We are seeking a talented individual...',
        salary: '$90K - $100K / Year'
    },
    {
        id: 6,
        title: 'Vue Native Developer',
        type: 'Remote',
        location: 'Portland, OR',
        description: 'Join our team as a Front-End Developer in beautiful Portland, OR. We are looking for a skilled and enthusiastic individual...',
        salary: '$100K - $110K / Year'
    }
]

const filteredJobs = computed(() => {
    return jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})
</script>

<style scoped>
.v-card {
    transition: transform 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
}
</style>