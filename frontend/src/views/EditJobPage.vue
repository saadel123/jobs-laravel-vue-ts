<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useSnackbar } from '@/composables/useSnackbar';
import JobForm from '@/components/JobForm.vue';
import type { Job } from '@/types/job';

const { trigger } = useSnackbar();
const route = useRoute();
const router = useRouter();
const jobId = route.params.id;
const isLoading = ref(true);
const form = ref<Job>({
    type: '', title: '', description: '', salary: '', location: '',
    company: { name: '', description: '', contactEmail: '', contactPhone: '' },
});

const fetchJob = async () => {
    try {
        const res = await axios.get(`/api/jobs/${jobId}`);
        form.value = res.data;
    } catch {
        trigger("Failed to load job", 'error');
    } finally {
        isLoading.value = false;
    }
};

const submitForm = async (data: Job) => {
    try {
        await axios.put(`/api/jobs/${jobId}`, data);
        trigger("Job updated successfully");
        router.push(`/jobs/${jobId}`);
    } catch {
        trigger("Failed to update job", 'error');
    }
};

onMounted(fetchJob);
</script>

<template>
    <JobForm v-if="!isLoading" :model-value="form" is-edit-mode @update:modelValue="form = $event"
        @submit="submitForm" />
</template>

<style scoped>
.max-width {
    max-width: 800px;
}
</style>