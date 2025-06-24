<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useSnackbar } from '@/composables/useSnackbar';
import JobForm from '@/components/job/JobForm.vue';
import type { Job } from '@/types/job';
import api from '../../api';


const { trigger } = useSnackbar();
const form = ref<Job>({
    type: '', title: '', description: '', salary: '', location: '',
    company: { name: '', description: '', contact_email: '', contact_phone: '' },
});

const submitForm = async (data: Job) => {
    try {
        const res = await api.post('/jobs', data);
        trigger("Job created successfully");
        router.push(`/jobs/${res.data.id}`);
    } catch {
        trigger("Failed to create job", 'error');
    }
};
</script>

<style scoped>
.max-width {
    max-width: 800px;
}
</style>

<template>
    <JobForm :model-value="form" @update:modelValue="form = $event" @submit="submitForm" />
</template>