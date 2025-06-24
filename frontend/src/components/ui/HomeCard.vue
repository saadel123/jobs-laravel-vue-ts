<script setup lang="ts">
import Card from "@/components/ui/Card.vue"
</script>

<template>
    <!-- Developers and Employers Section -->
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="10">
                <v-row>
                    <!-- For Developers Card -->
                    <v-col cols="12" md="6">
                        <!-- elevation use to create shadow and accepts values from 0 to 24, where -->
                        <Card bg="grey-lighten-4">
                            <h2 class="text-h5 font-weight-bold mb-2">For Developers</h2>
                            <p class="text-body-1 mb-4">
                                Browse our Vue jobs and start your career today
                            </p>
                            <v-btn color="black" variant="elevated" class="text-white" to="/jobs">
                                Browse Jobs
                            </v-btn>
                        </Card>
                    </v-col>

                    <!-- For Employers Card -->
                    <v-col cols="12" md="6">
                        <Card bg="green-lighten-4">
                            <h2 class="text-h5 font-weight-bold mb-2">For Employers</h2>
                            <p class="text-body-1 mb-4">
                                List your job to find the perfect developer for the role
                            </p>
                            <v-btn color="green-darken-2" variant="elevated" class="text-white" to="/add-job">
                                Add Job
                            </v-btn>
                        </Card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>