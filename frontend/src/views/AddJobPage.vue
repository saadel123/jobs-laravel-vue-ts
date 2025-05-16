<template>
    <v-sheet color="green-lighten-5" class="py-10">
        <v-container class="max-width">
            <v-card class="pa-6 rounded-lg" elevation="2">
                <v-form ref="formRef" v-model="formValid" @submit.prevent="submitForm">
                    <h2 class="text-h3 text-center font-weight-bold mb-6">Add Job</h2>

                    <v-select v-model="form.type" :items="jobTypes" label="Job Type" variant="outlined"
                        :rules="[rules.required]" class="mb-4" required></v-select>

                    <v-text-field v-model="form.title" label="Job Listing Name" variant="outlined"
                        :rules="[rules.required]" placeholder="e.g., Senior Vue Developer" required
                        class="mb-4"></v-text-field>

                    <v-textarea v-model="form.description" label="Description" variant="outlined" rows="4"
                        :rules="[rules.required]" placeholder="Add job duties, expectations, etc."
                        class="mb-4"></v-textarea>

                    <v-select v-model="form.salary" :items="salaryRanges" label="Salary" variant="outlined"
                        :rules="[rules.required]" class="mb-4" required></v-select>

                    <v-text-field v-model="form.location" label="Location" variant="outlined" :rules="[rules.required]"
                        placeholder="Company Location" required class="mb-4"></v-text-field>

                    <h3 class="text-h4 mb-5">Company Info</h3>

                    <v-text-field v-model="form.company.name" label="Company Name" variant="outlined"
                        :rules="[rules.required]" placeholder="Company Name" class="mb-4"></v-text-field>

                    <v-textarea v-model="form.company.description" label="Company Description" variant="outlined"
                        rows="4" :rules="[rules.required]" placeholder="What does your company do?"
                        class="mb-4"></v-textarea>

                    <v-text-field v-model="form.company.contactEmail" label="Contact Email" type="email"
                        :rules="[rules.required, rules.email]" variant="outlined" placeholder="Email for applicants"
                        required class="mb-4"></v-text-field>

                    <v-text-field v-model="form.company.contactPhone" label="Contact Phone" type="tel"
                        variant="outlined" placeholder="Optional phone" class="mb-4"></v-text-field>

                    <v-btn type="submit" color="green-darken-2" size="large" block class="text-white">
                        Add Job
                    </v-btn>
                </v-form>
            </v-card>
        </v-container>

        <!-- Snackbar Notification -->
        <v-snackbar v-model="snackbar.show" location="top right" :color="snackbar.color" timeout="3000">
            {{ snackbar.message }}
        </v-snackbar>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const form = ref({
    type: '',
    title: '',
    description: '',
    salary: '',
    location: '',
    company: {
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
    },
});

const jobTypes = ['Full-Time', 'Part-Time', 'Remote', 'Internship'];

const salaryRanges = [
    'Under $50K', '$50K - $60K', '$60K - $70K', '$70K - $80K',
    '$80K - $90K', '$90K - $100K', '$100K - $125K',
    '$125K - $150K', '$150K - $175K', '$175K - $200K', 'Over $200K'
];

// Validation
const formValid = ref(false);
const formRef = ref();

const rules = {
    required: (v: string) => !!v || 'This field is required',
    email: (v: string) => !v || /^\S+@\S+\.\S+$/.test(v) || 'Email must be valid',
};

// Snackbar
const snackbar = ref({
    show: false,
    message: '',
    color: 'success'
});

const showSnackbar = (message: string, color: string = 'success') => {
    snackbar.value.message = message;
    snackbar.value.color = color;
    snackbar.value.show = true;
};

const submitForm = async () => {
    const isValid = await formRef.value?.validate();
    if (!isValid?.valid) {
        showSnackbar("Please fill out all required fields", 'error');
        return;
    }

    try {
        const response = await axios.post('/api/jobs', form.value);
        router.push(`/jobs/${response.data.id}`);
        showSnackbar("Job added successfully");
    } catch (error) {
        console.error("Error:", error);
        showSnackbar("Failed to add job", 'error');
    }
};


</script>

<style scoped>
.max-width {
    max-width: 800px;
}
</style>