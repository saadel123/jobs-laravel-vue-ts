<template>
    <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
        <v-icon color="yellow-darken-2" size="64" class="mb-4">mdi-alert</v-icon>

        <h1 class="text-h2 font-weight-bold mb-4">404 Not Found</h1>

        <p class="text-subtitle-1 mb-5">This page does not exist</p>

        <v-btn text color="green-darken-2" class="text-white px-6 py-3" variant="elevated" to="/">
            Go Back
        </v-btn>
    </v-container>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>