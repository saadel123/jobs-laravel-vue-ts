<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Job } from '@/types/job'
import { getJobTypeColor } from '@/utils/job';
//We can use Type job in this way:

// const props = defineProps({
//     job: {
//         type: Object as PropType<Job>,  // Cast to PropType
//         required: true
//     }
// });
//Or we can use Pure typescript code like this:
const props = defineProps<{
    job: Job
}>()

const showFullDescription = ref(false)

const truncatedDescription = computed(() => {
    return showFullDescription.value
        ? props.job.description
        : `${props.job.description.substring(0, 100)}${props.job.description.length > 100 ? '...' : ''}`
})

</script>

<template>
    <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4 rounded-lg h-100 d-flex flex-column"
            :class="{ 'hover-card': !$vuetify.theme.current.dark, 'hover-card-dark': $vuetify.theme.current.dark }">
            <!-- Job Type Badge -->
            <v-chip small :color="getJobTypeColor(job.type)" class="mb-3 align-self-start" text-color="white">
                {{ job.type }}
            </v-chip>

            <!-- Job Title -->
            <h3 class="text-h5 font-weight-bold mb-2">{{ job.title }}</h3>

            <!-- Company Name -->
            <div class="text-body-1 mb-3 d-flex align-center">
                <v-icon small class="mr-1">mdi-office-building</v-icon>
                {{ job.company.name }}
            </div>

            <!-- Description with Read More -->
            <div class="mb-4 text-body-1 flex-grow-1">
                {{ truncatedDescription }}
                <v-btn @click="showFullDescription = !showFullDescription" variant="text" size="small"
                    class="pl-0 text-capitalize"
                    :color="$vuetify.theme.current.dark ? 'blue-lighten-2' : 'green-darken-2'">
                    {{ showFullDescription ? 'Show less' : 'Read more' }}
                    <v-icon right small>
                        {{ showFullDescription ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                </v-btn>
            </div>
            <!-- Salary and Location -->
            <div class="mt-auto">
                <div class="d-flex align-center mb-2">
                    <v-icon small class="mr-1">mdi-cash</v-icon>
                    <span class="font-weight-medium">{{ job.salary }} / year</span>
                </div>

                <div class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-map-marker</v-icon>
                    <span>{{ job.location }}</span>
                </div>
            </div>

            <!-- Apply Button -->
            <v-btn :to="`/jobs/${job.id}`" block class="mt-4"
                :color="$vuetify.theme.current.dark ? 'blue-darken-2' : 'green-darken-2'" variant="flat">
                View Details
                <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
        </v-card>
    </v-col>
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
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.hover-card-dark:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3) !important;
}

.v-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>