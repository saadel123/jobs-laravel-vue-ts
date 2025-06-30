<template>
    <v-container class="max-width">
        <v-card class="pa-6 rounded-lg" elevation="2">
            <v-form v-model="formValid" @submit.prevent="updateUser" ref="formRef">
                <h2 class="text-h4 text-center font-weight-bold mb-6">Mon Profil</h2>

                <!-- Name -->
                <v-text-field v-model="form.name" label="Nom" variant="outlined" :rules="[rules.required]"
                    :error-messages="errors.name" class="mb-4" />

                <!-- Email (readonly) -->
                <v-text-field v-model="form.email" label="Adresse Email" type="email" variant="outlined" readonly
                    class="mb-4" />

                <!-- Old Password (Always Visible) -->
                <v-text-field v-model="form.old_password" label="Mot de passe actuel" type="password" variant="outlined"
                    :error-messages="errors.old_password" class="mb-4"
                    placeholder="Entrez votre mot de passe actuel pour changer le mot de passe" />

                <!-- New Password -->
                <v-text-field v-model="form.password" label="Nouveau mot de passe" type="password" variant="outlined"
                    :error-messages="errors.password" class="mb-4" placeholder="Laissez vide pour ne pas changer" />

                <!-- Password Confirmation -->
                <v-text-field v-model="form.password_confirmation" label="Confirmer le mot de passe" type="password"
                    variant="outlined" :error-messages="errors.password_confirmation" class="mb-4"
                    placeholder="Répétez le mot de passe" />

                <!-- Submit Button -->
                <v-btn type="submit" color="primary" size="large" block :loading="loading">
                    Mettre à jour
                </v-btn>



            </v-form>
        </v-card>
    </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import api from '@/api';
import { useSnackbar } from '@/composables/useSnackbar';
import { cloneDeep, isEqual } from 'lodash-es'; // Deep copy and deep comparison

const { trigger } = useSnackbar();

interface UserForm {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    old_password?: string;
}

interface ErrorBag {
    [key: string]: string[];
}

// Reactive form data
const form = ref<UserForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    old_password: ''
});

// Store initial form state for change detection
const initialForm = ref<UserForm>({ ...form.value });

const errors = ref<ErrorBag>({});
const formValid = ref(false);
const formRef = ref();
const loading = ref(false);

// Validation rules used by Vuetify inputs
const rules = {
    required: (v: string) => !!v || 'Ce champ est requis',
    email: (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email invalide'
};

// Fetch current user data on component mount
onMounted(async () => {
    try {
        const { data } = await api.get('/profile/user');
        form.value.name = data.name;
        form.value.email = data.email;

        // Take snapshot after initial data load
        initialForm.value = cloneDeep(form.value);
    } catch (error) {
        console.error('Erreur de récupération du profil:', error);
    }
});

const updateUser = async () => {
    // Trigger validation on the form, skip if invalid
    const isValid = await formRef.value?.validate();
    if (!isValid) return;

    // Compare only relevant fields (ignore passwords for this check)
    const formToCompare = { ...form.value };
    delete formToCompare.password;
    delete formToCompare.password_confirmation;
    delete formToCompare.old_password;

    const initialToCompare = { ...initialForm.value };
    delete initialToCompare.password;
    delete initialToCompare.password_confirmation;
    delete initialToCompare.old_password;

    // Skip update if nothing changed and no password update intended
    if (isEqual(formToCompare, initialToCompare) && !form.value.password) {
        trigger('Aucune modification détectée.', 'info');
        return;
    }

    try {
        errors.value = {};
        loading.value = true;

        const payload: Record<string, string> = {
            name: form.value.name,
            email: form.value.email
        };

        // Add password fields if user wants to change password
        if (form.value.password) {
            payload.password = form.value.password;
            payload.password_confirmation = form.value.password_confirmation || '';
            payload.old_password = form.value.old_password || '';
        }

        // Submit updated profile
        await api.put('/profile/user', payload);

        trigger('Profil mis à jour avec succès !');

        // Clear sensitive password fields
        form.value.password = '';
        form.value.password_confirmation = '';
        form.value.old_password = '';

        // Update initial snapshot after successful update
        initialForm.value = cloneDeep(form.value);
    } catch (error: any) {
        // Inject backend validation errors
        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors;

            // Mark form as invalid to re-render field error states
            formValid.value = false;
            await formRef.value?.validate(); // Refresh field visuals
        }

        trigger("Échec de la mise à jour du profil", 'error');
    } finally {
        loading.value = false;
    }
};

</script>
