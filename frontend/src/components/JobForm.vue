<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import type { Job } from '@/types/job';

const props = defineProps<{
    modelValue: Job;
    isEditMode?: boolean;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: Job): void;
    (e: 'submit', value: Job): void;
}>();

const { modelValue } = toRefs(props);
const localForm = ref<Job>({ ...modelValue.value });
watch(localForm, (val) => emit('update:modelValue', val), { deep: true });

const formRef = ref();
const formValid = ref(false);

const jobTypes = ['Full-Time', 'Part-Time', 'Remote', 'Internship'];
const salaryRanges = ['Under $50K', '$50K - $60K', '$60K - $70K', 'Over $200K'];

const rules = {
    required: (v: string) => !!v || 'This field is required',
    email: (v: string) => !v || /^\S+@\S+\.\S+$/.test(v) || 'Invalid email',
};

const onSubmit = async () => {
    const isValid = await formRef.value?.validate();
    if (isValid?.valid) emit('submit', localForm.value);
};
</script>

<template>
    <v-container class="max-width">
        <v-card class="pa-6 rounded-lg" elevation="2">
            <v-form ref="formRef" v-model="formValid" @submit.prevent="onSubmit">
                <h2 class="text-h3 text-center font-weight-bold mb-6">
                    {{ isEditMode ? 'Edit Job' : 'Add Job' }}
                </h2>

                <!-- Fields -->
                <v-select v-model="localForm.type" :items="jobTypes" label="Job Type" variant="outlined"
                    :rules="[rules.required]" class="mb-4" />
                <v-text-field v-model="localForm.title" label="Job Title" variant="outlined" :rules="[rules.required]"
                    class="mb-4" />
                <v-textarea v-model="localForm.description" label="Description" variant="outlined" rows="4"
                    :rules="[rules.required]" class="mb-4" />
                <v-select v-model="localForm.salary" :items="salaryRanges" label="Salary" variant="outlined"
                    :rules="[rules.required]" class="mb-4" />
                <v-text-field v-model="localForm.location" label="Location" variant="outlined" :rules="[rules.required]"
                    class="mb-4" />

                <h3 class="text-h4 mb-5">Company Info</h3>
                <v-text-field v-model="localForm.company.name" label="Company Name" variant="outlined"
                    :rules="[rules.required]" class="mb-4" />
                <v-textarea v-model="localForm.company.description" label="Company Description" variant="outlined"
                    rows="4" :rules="[rules.required]" class="mb-4" />
                <v-text-field v-model="localForm.company.contactEmail" label="Contact Email" type="email"
                    variant="outlined" :rules="[rules.required, rules.email]" class="mb-4" />
                <v-text-field v-model="localForm.company.contactPhone" label="Contact Phone" type="tel"
                    variant="outlined" class="mb-4" />

                <v-btn type="submit" color="green-darken-2" size="large" block class="text-white">
                    {{ isEditMode ? 'Update Job' : 'Add Job' }}
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>