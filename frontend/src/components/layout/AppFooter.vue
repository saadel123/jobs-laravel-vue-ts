<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)
</script>

<template>
    <v-footer :color="isDark ? 'grey-darken-4' : 'green'" app>
        <v-col class="text-center" cols="12">
            <span class="white--text">&copy; 2025 Vue Jobs By Saad EL Ghanemy</span>
        </v-col>
    </v-footer>
</template>
