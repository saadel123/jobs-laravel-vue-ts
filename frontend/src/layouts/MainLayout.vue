<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar color="green" dark app>
            <v-toolbar-title>Vue Jobs</v-toolbar-title>
            <v-spacer />
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/jobs">Jobs</v-btn>
            <v-btn text to="/add-job">Add Job</v-btn>
        </v-app-bar>


        <!-- Main Content -->
        <v-main>
            <v-container>
                <router-view />
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

<script setup lang="ts">
// No setup needed for the layout
</script>

<style scoped>
/* Optional: Custom Styles */
</style>