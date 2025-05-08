<script setup lang="ts">
import HomeCard from "../components/HomeCard.vue"
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
    }
];
</script>

<template>
    <v-container class="pa-0">
        <HomeCard></HomeCard>

        <!-- Browse Jobs Section -->
        <v-sheet color="green-lighten-5" class="py-10">
            <v-container>
                <h2 class="text-h3 font-weight-bold text-green-darken-2 mb-6 text-center">
                    Browse Jobs
                </h2>
                <v-row class="justify-center">
                    <v-col cols="12" md="10">
                        <v-row>
                            <v-col v-for="job in jobs" :key="job.id" cols="12" md="4">
                                <v-card class="rounded-xl" elevation="2">
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
                                            <v-btn color="green-darken-2" variant="elevated" class="text-white"
                                                :to="`/jobs/${job.id}`">
                                                Read More
                                            </v-btn>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>

        <!-- View All Jobs Button -->
        <v-container class="text-center">
            <v-btn color="black" variant="elevated" class="text-white px-6 py-4" size="large" to="/jobs">
                View All Jobs
            </v-btn>
        </v-container>
    </v-container>
</template>


<style scoped>
.v-card {
    transition: transform 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
}
</style>