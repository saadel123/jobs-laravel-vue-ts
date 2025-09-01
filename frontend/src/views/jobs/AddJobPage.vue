<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

// Fetch user's company info on mount
onMounted(async () => {
    try {
        const res = await api.get('/me/company');
        const company = res.data;

        form.value = {
            ...form.value,
            company: {
                id: company.id,
                user_id: company.user_id,
                name: company.name,
                description: company.description,
                contact_email: company.contact_email,
                contact_phone: company.contact_phone,
                created_at: company.created_at,
                updated_at: company.updated_at,
            }
        };
    } catch {
        trigger("Failed to fetch company info", 'error');
    }
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