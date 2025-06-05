<script setup lang="ts">
import Toastr from '@/components/Toastr.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useTheme } from 'vuetify'

const authStore = useAuthStore();
const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    localStorage.setItem('theme', theme.global.name.value)
    isDark.value = theme.global.current.value.dark
}
</script>

<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar :color="isDark ? 'grey-darken-4' : 'green'" app>
            <v-toolbar-title>Vue Jobs</v-toolbar-title>
            <v-spacer />

            <!-- Theme Toggle - Always visible -->
            <v-btn @click="toggleTheme" icon variant="text" size="small"
                :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" class="mr-2">
                <v-icon v-if="isDark">mdi-weather-sunny</v-icon>
                <v-icon v-else>mdi-weather-night</v-icon>
            </v-btn>

            <!-- Authenticated Navigation -->
            <template v-if="authStore.isAuthenticated">
                <v-btn variant="text" to="/">Home</v-btn>
                <v-btn variant="text" to="/jobs">Jobs</v-btn>
                <v-btn variant="text" to="/jobs/add">Add Job</v-btn>

                <!-- User Menu Dropdown -->
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" v-bind="props">
                            <v-icon left>mdi-account</v-icon>
                            Account
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="authStore.logout" :disabled="authStore.loggingOut">
                            <v-list-item-title>
                                <v-icon left>mdi-logout</v-icon>
                                Logout
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>

            <!-- Guest Navigation -->
            <template v-else>
                <v-btn variant="text" to="/login">Login</v-btn>
                <v-btn variant="text" to="/register">Register</v-btn>
            </template>
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
            <v-container>
                <router-view />
                <Toastr />
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-footer :color="isDark ? 'grey-darken-4' : 'green'" app>
            <v-col class="text-center" cols="12">
                <span :class="isDark ? 'white--text' : 'white--text'">&copy; 2025 Vue Jobs By Saad EL Ghanemy</span>
            </v-col>
        </v-footer>
    </v-app>
</template>

<style scoped>
html,
body,
.v-theme--dark.v-application {
  background-color: #212121 !important;
}



/* Smooth transitions for theme changes */
.v-app-bar,
.v-footer {
    transition: background-color 0.3s ease;
}

/* Better active link indication */
.v-btn.v-btn--active {
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
}

/* Dark mode specific adjustments */
.v-theme--dark .v-btn.v-btn--active {
    background: rgba(255, 255, 255, 0.05);
}
</style>