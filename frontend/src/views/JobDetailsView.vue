<template>
    <v-container class="py-6">
        <!-- Go Back -->
        <v-container>
            <v-btn href="/jobs" color="green-darken-2" variant="text" class="px-0 text-none">
                <v-icon left>mdi-arrow-left</v-icon>
                Back to Job Listings
            </v-btn>
        </v-container>

        <!-- Job Listings -->
        <v-row class="bg-green-50 py-10">
            <v-col cols="12" md="8">
                <!-- Main Content -->
                <v-card class="mb-6">
                    <v-card-text>
                        <div class="text-center md:text-left">
                            <div class="text-grey-500 mb-4">Full-Time</div>
                            <h1 class="display-1 font-weight-bold">Senior Vue Developer</h1>
                            <div class="d-flex justify-center md:justify-start align-center mb-4">
                                <v-icon color="orange" small>mdi-map-marker</v-icon>
                                <p class="text-orange-700">Boston, MA</p>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Job Description -->
                <v-card>
                    <v-card-title class="green--text text-h5">Job Description</v-card-title>
                    <v-card-text>
                        <p class="text-body-1">
                            We are seeking a talented Front-End Developer to join our team in
                            Boston, MA. The ideal candidate will have strong skills in HTML,
                            CSS, and JavaScript, with experience working with modern JavaScript
                            frameworks such as Vue or Angular.
                        </p>

                        <v-divider class="my-4"></v-divider>

                        <v-card-title class="green--text text-h5">Salary</v-card-title>
                        <p>$70k - $80K / Year</p>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" md="4">
                <!-- Company Info -->
                <v-card>
                    <v-card-title class="text-xl font-weight-bold">Company Info</v-card-title>
                    <v-card-text>
                        <h2 class="text-2xl">NewTek Solutions</h2>
                        <p class="text-body-1">
                            NewTek Solutions is a leading technology company specializing in
                            web development and digital solutions. We pride ourselves on
                            delivering high-quality products and services to our clients
                            while fostering a collaborative and innovative work environment.
                        </p>

                        <v-divider class="my-4"></v-divider>

                        <h3 class="text-xl">Contact Email:</h3>
                        <v-chip class="my-2" color="green" dark>contact@newteksolutions.com</v-chip>

                        <h3 class="text-xl">Contact Phone:</h3>
                        <v-chip class="my-2" color="green" dark>555-555-5555</v-chip>
                    </v-card-text>
                </v-card>

                <!-- Manage Job -->
                <v-card class="mt-6">
                    <v-card-title class="text-xl font-weight-bold">Manage Job</v-card-title>
                    <v-card-text>
                        <v-btn href="/add-job" color="green" class="w-full me-4" large>
                            Edit Job
                        </v-btn>
                        <v-btn color="red" class="w-full" large>
                            Delete Job
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const jobs = [
    {
        id: 1,
        title: 'Senior Vue Developer',
        location: 'Boston, MA',
        description: 'We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript...'
    },
    {
        id: 2,
        title: 'Front-End Engineer (Vue)',
        location: 'Miami, FL',
        description: 'Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion...'
    },
    {
        id: 3,
        title: 'Vue.js Developer',
        location: 'Brooklyn, NY',
        description: 'Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference...'
    }
];

const filteredJobs = computed(() => {
    return jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})
</script>
