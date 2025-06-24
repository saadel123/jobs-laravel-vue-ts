<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Reactive variables for registration
const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const showPassword = ref(false);

// Handles the registration process
const register = async () => {
    isLoading.value = true;

    const trimmedName = name.value.trim();
    const trimmedEmail = email.value.trim();
    const trimmedPassword = password.value.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        errorMessage.value = 'All fields are required.';
        isLoading.value = false;
        return;
    }

    errorMessage.value = '';

    try {
        const success = await authStore.register(trimmedName, trimmedEmail, trimmedPassword);
        if (!success) {
            errorMessage.value = 'Registration failed. Please try again.';
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="mx-auto auth-card pa-6 rounded-lg" width="600" elevation="4">
            <v-card-title class="text-center py-8">
                <v-icon size="48" color="green-darken-2 account-circle" class="mr-3">mdi-account-plus</v-icon>
                <span class="text-h3 font-weight-bold primary--text">Create Account</span>
            </v-card-title>

            <v-card-subtitle class="text-center text-h6 text-medium-emphasis mt-2">
                Register to get started
            </v-card-subtitle>

            <v-card-text class="px-6 pb-6">
                <!-- Name input -->
                <v-text-field v-model="name" label="Full Name" :disabled="isLoading"
                    prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" class="mb-6"
                    autofocus single-line height="60"></v-text-field>

                <!-- Email input -->
                <v-text-field v-model="email" label="Email Address" type="email" :disabled="isLoading"
                    prepend-inner-icon="mdi-email-outline" variant="outlined" density="comfortable" class="mb-6"
                    single-line height="60"></v-text-field>

                <!-- Password input -->
                <v-text-field v-model="password" :label="showPassword ? 'Password (visible)' : 'Password'"
                    :type="showPassword ? 'text' : 'password'" :disabled="isLoading"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" density="comfortable"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword" class="mb-2" single-line
                    height="60"></v-text-field>

                <!-- Error message -->
                <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-6" icon="mdi-alert-circle-outline">
                    {{ errorMessage }}
                </v-alert>

                <!-- Register button -->
                <v-btn block @click="register" color="green-darken-2" :loading="isLoading" :disabled="isLoading" size="x-large"
                    class="mt-4" append-icon="mdi-account-check" height="56">
                    Sign Up
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
.auth-card {
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
}

.v-text-field {
    border-radius: 6px;
    font-size: 1.1rem;
}

.v-btn {
    letter-spacing: 0.5px;
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: none;
    transition: all 0.3s ease;
}

.v-btn:hover {
    transform: translateY(-1px);
}

.v-alert {
    border-left: 4px solid rgb(var(--v-theme-error));
    font-size: 1rem;
}

.account-circle {
    margin-top: -23px;
}
</style>
