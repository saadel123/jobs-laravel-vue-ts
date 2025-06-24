<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)

const toggleTheme = () => {
    theme.global.name.value = isDark.value ? 'light' : 'dark'
    localStorage.setItem('theme', theme.global.name.value)
    isDark.value = theme.global.current.value.dark
}
</script>

<template>
    <v-app-bar :color="isDark ? 'grey-darken-4' : 'green'" app>
        <v-toolbar-title>Vue Jobs</v-toolbar-title>
        <v-spacer />

        <!-- Theme Toggle -->
        <v-btn @click="toggleTheme" icon variant="text" size="small"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" class="mr-2">
            <v-icon v-if="isDark">mdi-weather-sunny</v-icon>
            <v-icon v-else>mdi-weather-night</v-icon>
        </v-btn>

        <!-- Navigation Links -->
        <v-btn variant="text" to="/">Home</v-btn>
        <v-btn variant="text" to="/jobs">Jobs</v-btn>
        <v-btn variant="text" to="/jobs/add">Add Job</v-btn>

        <template v-if="authStore.isAuthenticated">
            <!-- Authenticated Menu -->
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn variant="text" v-bind="props">
                        <v-icon left>mdi-account</v-icon>
                        Account
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item :to="{ path: '/profile/jobs' }" link>
                        <v-list-item-title>
                            <v-icon left class="mr-2">mdi-briefcase</v-icon>
                            My Jobs
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item :to="{ path: '/profile/user' }" link>
                        <v-list-item-title>
                            <v-icon left class="mr-2">mdi-account-circle</v-icon>
                            Profile Info
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item :to="{ path: '/profile/company' }" link>
                        <v-list-item-title>
                            <v-icon left class="mr-2">mdi-domain</v-icon>
                            Company Info
                        </v-list-item-title>
                    </v-list-item>

                    <v-divider class="my-1" />

                    <v-list-item @click="authStore.logout" class="text-red">
                        <v-list-item-title>
                            <v-icon left class="mr-2 text-red">mdi-logout</v-icon>
                            Logout
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>

        <template v-else>
            <!-- Guest Buttons -->
            <v-btn variant="text" to="/login">Login</v-btn>
            <v-btn variant="text" to="/register">Register</v-btn>
        </template>
    </v-app-bar>
</template>
