<template>
    <v-sheet color="green-lighten-5" class="py-10">
        <v-container class="max-width">
            <v-card class="pa-6 rounded-lg" elevation="2">
                <v-form @submit.prevent="submitForm">
                    <h2 class="text-h3 text-center font-weight-bold mb-6">Add Job</h2>

                    <!-- Job Type -->
                    <v-select v-model="form.type" :items="jobTypes" label="Job Type" variant="outlined" required
                        class="mb-4"></v-select>

                    <!-- Job Title -->
                    <v-text-field v-model="form.name" label="Job Listing Name" variant="outlined"
                        placeholder="eg. Senior Vue Developer" required class="mb-4"></v-text-field>

                    <!-- Description -->
                    <v-textarea v-model="form.description" label="Description" variant="outlined" rows="4"
                        placeholder="Add any job duties, expectations, requirements, etc" class="mb-4"></v-textarea>

                    <!-- Salary -->
                    <v-select v-model="form.salary" :items="salaryRanges" label="Salary" variant="outlined" required
                        class="mb-4"></v-select>

                    <!-- Location -->
                    <v-text-field v-model="form.location" label="Location" variant="outlined"
                        placeholder="Company Location" required class="mb-4"></v-text-field>

                    <!-- Company Info Section -->
                    <h3 class="text-h4 mb-5">Company Info</h3>

                    <!-- Company Name -->
                    <v-text-field v-model="form.company" label="Company Name" variant="outlined"
                        placeholder="Company Name" class="mb-4"></v-text-field>

                    <!-- Company Description -->
                    <v-textarea v-model="form.company_description" label="Company Description" variant="outlined"
                        rows="4" placeholder="What does your company do?" class="mb-4"></v-textarea>

                    <!-- Contact Email -->
                    <v-text-field v-model="form.contact_email" label="Contact Email" type="email" variant="outlined"
                        placeholder="Email address for applicants" required class="mb-4"></v-text-field>

                    <!-- Contact Phone -->
                    <v-text-field v-model="form.contact_phone" label="Contact Phone" type="tel" variant="outlined"
                        placeholder="Optional phone for applicants" class="mb-4"></v-text-field>

                    <!-- Submit Button -->
                    <v-btn type="submit" color="green-darken-2" size="large" block class="text-white">
                        Add Job
                    </v-btn>
                </v-form>
            </v-card>
        </v-container>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
    type: '',
    name: '',
    description: '',
    salary: '',
    location: '',
    company: '',
    company_description: '',
    contact_email: '',
    contact_phone: ''
});

const jobTypes = [
    'Full-Time',
    'Part-Time',
    'Remote',
    'Internship'
];

const salaryRanges = [
    'Under $50K',
    '$50K - $60K',
    '$60K - $70K',
    '$70K - $80K',
    '$80K - $90K',
    '$90K - $100K',
    '$100K - $125K',
    '$125K - $150K',
    '$150K - $175K',
    '$175K - $200K',
    'Over $200K'
];

const submitForm = () => {
    // Handle form submission
    console.log('Form submitted:', form.value);
    // You would typically send this data to your backend here
};
</script>

<style scoped>
.max-width {
    max-width: 800px;
}
</style>