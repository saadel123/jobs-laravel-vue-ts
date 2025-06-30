<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import type { Job } from '@/types/job';
import { useSnackbar } from '@/composables/useSnackbar';
import { isEqual, cloneDeep } from 'lodash-es';

const { trigger } = useSnackbar();

const props = defineProps<{
    modelValue: Job;       // Job data passed from parent component
    isEditMode?: boolean;  // Flag to differentiate between add/edit mode
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: Job): void;  // Sync changes to parent
    (e: 'submit', value: Job): void;             // Trigger submit event with updated data
}>();

const { modelValue } = toRefs(props);

// Create a deep copy of the prop to avoid mutating it directly
const localForm = ref<Job>(cloneDeep(modelValue.value));

// Watch localForm and emit updates so parent component stays in sync
watch(localForm, (val) => emit('update:modelValue', val), { deep: true });

// Keep a snapshot of the initial form data for change detection on submit
const initialForm = ref<Job>(cloneDeep(modelValue.value));

const formRef = ref();      // Reference to the v-form component
const formValid = ref(false);  // Tracks form validation status
const loading = ref(false);     // Tracks submission/loading state

// Static options for dropdowns in the form
const jobTypes = ['Full-Time', 'Part-Time', 'Remote', 'Internship'];
const salaryRanges = ['Under $50K', '$50K - $60K', '$60K - $70K', 'Over $200K'];

// Validation rules used by Vuetify form inputs
const rules = {
    required: (v: string) => !!v || 'This field is required',
    email: (v: string) => !v || /^\S+@\S+\.\S+$/.test(v) || 'Invalid email',
};

const onSubmit = async () => {
    // Trigger validation on the form, skip if invalid
    const isValid = await formRef.value?.validate();
    if (!isValid?.valid) return;

    // Prevent unnecessary updates if user hasn't changed anything
    if (isEqual(localForm.value, initialForm.value)) {
        trigger('No changes detected, update skipped.', 'info');
        return;
    }

    loading.value = true;  // Show loading state during submit
    try {
        // Emit submit event to parent with the updated form data
        await emit('submit', localForm.value);

        // Notify user of success based on mode
        trigger(props.isEditMode ? 'Job updated successfully!' : 'Job added successfully!');

        // Update initial snapshot to current state after successful save
        initialForm.value = cloneDeep(localForm.value);
    } catch (error) {
        // Show error notification on failure
        trigger('Failed to submit job', 'error');
    } finally {
        loading.value = false;  // Reset loading state
    }
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
                <v-text-field v-model="localForm.company.contact_email" label="Contact Email" type="email"
                    variant="outlined" :rules="[rules.required, rules.email]" class="mb-4" />
                <v-text-field v-model="localForm.company.contact_phone" label="Contact Phone" type="tel"
                    variant="outlined" class="mb-4" />

                <v-btn type="submit" color="green-darken-2" size="large" block class="text-white">
                    {{ isEditMode ? 'Update Job' : 'Add Job' }}
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>