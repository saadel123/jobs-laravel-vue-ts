import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";
import { useRouter } from "vue-router";
import type { User } from "@/types/user";

export const useAuthStore = defineStore("auth", () => {
    const token = ref<string | null>(localStorage.getItem("token"));
    const user = ref<User | null>(null);
    const router = useRouter();

    const isAuthenticated = computed(() => !!token.value);
    const isLoggedIn = isAuthenticated; // alias

    // Fetch the authenticated user
    const fetchUser = async () => {
        if (!token.value) return;
        try {
            const response = await api.get("/user");
            user.value = response.data;
        } catch (error) {
            console.error("Failed to fetch user:", error);
            logout(); // token might be invalid
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/login", { email, password });
            token.value = response.data.token;
            localStorage.setItem("token", token.value);
            await fetchUser(); // fetch user after login
            router.push("/");
            return true;
        } catch (error) {
            return false;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post("/register", {
                name,
                email,
                password,
            });
            token.value = response.data.token;
            localStorage.setItem("token", token.value);
            await fetchUser(); // fetch user after register
            router.push("/");
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = async () => {
        try {
            if (token.value) await api.post("/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            token.value = null;
            user.value = null;
            localStorage.removeItem("token");
            router.push("/login");
        }
    };

    // Auto-fetch user if token exists
    if (token.value) {
        fetchUser();
    }

    return {
        token,
        user,
        isAuthenticated,
        isLoggedIn,
        login,
        register,
        logout,
        fetchUser,
    };
});
