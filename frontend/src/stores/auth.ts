import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("token")); // Store token from localStorage
    const router = useRouter();

    // Check if the user is authenticated based on token
    const isAuthenticated = computed(() => !!token.value);

    // Login the user and store token
    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/login", { email, password });
            token.value = response.data.token;
            localStorage.setItem("token", token.value);
            router.push("/");
            return true;
        } catch (error) {
            return false;
        }
    };

    // Register a new user and login automatically
    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post("/register", {
                name,
                email,
                password,
            });
            token.value = response.data.token;
            localStorage.setItem("token", token.value);
            router.push("/");
            return true;
        } catch (error) {
            return false;
        }
    };

    // Logout the user and clear token
    const logout = async () => {
        try {
            if (token.value) await api.post("/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            token.value = null;
            localStorage.removeItem("token");
            router.push("/login");
        }
    };

    return { token, isAuthenticated, login, register, logout };
});
