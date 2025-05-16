<script setup lang="ts">
//no need to import defineporps in vue3.3+
// import { defineProps } from "vue";
defineProps({
    bg: {
        type: String,
        default: 'grey-lighten-4'
    }
})
</script>
<template>

    <v-card class="pa-6 rounded-lg" :color="bg" elevation="2">
        <slot></slot>
    </v-card>
</template>