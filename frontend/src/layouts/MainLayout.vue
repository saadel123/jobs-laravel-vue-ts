<script setup lang="ts">
import Toastr from '@/components/Toastr.vue';
</script>

<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar color="green" dark app>
            <v-toolbar-title>Vue Jobs</v-toolbar-title>
            <v-spacer />
            <!--
                Vuetify's v-btn with 'to' prop:
                - Automatically handles routing like RouterLink
                - No need for manual navigate calls
                - Includes built-in active state styling
            -->
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/jobs">Jobs</v-btn>
            <v-btn text to="/jobs/add">Add Job</v-btn>
            <!--
                Equivalent vanilla Vue implementation would be:
                <RouterLink to="/jobs" v-slot="{ navigate, isActive }">
                    <button
                        @click="navigate"
                        :class="{ 'active-button': isActive }"
                        class="text-button"
                    >
                        Jobs
                    </button>
                </RouterLink>

                Vuetify does all this automatically!
            -->
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
            <v-container>
                <router-view />
                <!-- Global Snackbar -->
                <Toastr></Toastr>
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-footer color="green" app>
            <v-col class="text-center" cols="12">
                <span class="white--text">&copy; 2025 Vue Jobs</span>
            </v-col>
        </v-footer>
    </v-app>
</template>

<style scoped lang="ts">
/* Optional: Custom Styles */
</style>