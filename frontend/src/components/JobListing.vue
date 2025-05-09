<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import type { Job } from '@/types/job';

//We can use Type job in this way:

// const props = defineProps({
//     job: {
//         type: Object as PropType<Job>,  // Cast to PropType
//         required: true
//     }
// });
//Or we can use Pure typescript code like this:
const props = defineProps<{ job: Job }>();

const showFullDescription = ref(false);

const truncatedDescription = computed(() => {
    return showFullDescription.value
        ? props.job.description
        : `${props.job.description.substring(0, 100)}...`;
});
</script>

<template>
    <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-lg" elevation="2">
            <!-- Job Type and Title -->
            <div class="mb-4">
                <div class="text-grey-darken-1">{{ job.type }}</div>
                <h3 class="text-h5 font-weight-bold">{{ job.title }}</h3>
            </div>

            <!-- Description with toggle -->
            <div class="mb-4 text-body-1">
                {{ truncatedDescription }}
                <v-btn @click="showFullDescription = !showFullDescription" variant="outlined" size="small" class="ml-1 mt-3">
                    {{ showFullDescription ? 'Show less' : 'Show more' }}
                </v-btn>
            </div>

            <!-- Salary -->
            <div class="text-green-darken-2 font-weight-bold mb-4">
                {{ job.salary }} / Year
            </div>

            <v-divider class="mb-4"></v-divider>

            <!-- Location and Details -->
            <div class="d-flex justify-space-between align-center">
                <div class="text-orange-darken-2">
                    <v-icon icon="mdi-map-marker" class="mr-1"></v-icon>
                    {{ job.location }}
                </div>
                <v-btn color="green-darken-2" variant="flat" :to="`/jobs/${job.id}`">
                    Read More
                </v-btn>
            </div>
        </v-card>
    </v-col>
</template>