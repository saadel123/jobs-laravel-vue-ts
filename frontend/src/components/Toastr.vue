<script setup lang="ts">
import { useSnackbar } from '@/composables/useSnackbar';

const { show, message, color } = useSnackbar();
</script>

<template>
    <v-snackbar v-model="show" location="top right" :color="color" timeout="3000" elevation="6" min-width="300px">
        <template v-slot:actions>
            <v-btn variant="text" :icon="true" size="small" @click="show = false" class="ml-2"
                aria-label="Close notification">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>

        <div class="d-flex align-center">
            <v-icon v-if="color === 'success'" color="white" class="mr-2">mdi-check-circle</v-icon>
            <v-icon v-else-if="color === 'error'" color="white" class="mr-2">mdi-alert-circle</v-icon>
            <v-icon v-else class="mr-2">mdi-information</v-icon>

            <span>{{ message }}</span>
        </div>
    </v-snackbar>
</template>

<style scoped>
.v-snackbar {
    border-radius: 8px;
}

.v-snackbar :deep(.v-snackbar__content) {
    padding-right: 8px;
}
</style>