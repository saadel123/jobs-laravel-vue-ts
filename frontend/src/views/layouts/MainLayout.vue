<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import Toastr from '@/components/ui/Toastr.vue'
</script>

<template>
    <v-app>
        <AppHeader />
        <v-main>
            <v-container>
                <router-view />
                <Toastr />
            </v-container>
        </v-main>
        <AppFooter />
    </v-app>
</template>

<style scoped>
html,
body,
.v-theme--dark.v-application {
    background-color: #212121 !important;
}

.v-app-bar,
.v-footer {
    transition: background-color 0.3s ease;
}

.v-btn.v-btn--active {
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
}

.v-theme--dark .v-btn.v-btn--active {
    background: rgba(255, 255, 255, 0.05);
}
</style>
