import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JobsView from "../views/JobsView.vue";
import JobDetailsView from "../views/JobDetailsView.vue";
import AddJobPage from "../views/AddJobPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
import NotFoundView from "../views/NotFoundView.vue";
import EditJobPage from "../views/EditJobPage.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/login",
            name: "Login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "Register",
            component: RegisterView,
        },
        {
            path: "/",
            name: "Home",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "HomePage",
                    component: HomeView,
                },
            ],
        },
        {
            path: "/jobs",
            name: "Jobs",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "JobList",
                    component: JobsView,
                },
            ],
        },
        {
            path: "/jobs/:id",
            name: "JobDetails",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "JobDetailPage",
                    component: JobDetailsView,
                },
            ],
        },
        {
            path: "/jobs/add",
            name: "AddJob",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "AddJobPage",
                    component: AddJobPage,
                },
            ],
        },
        {
            path: "/jobs/edit/:id",
            name: "EditJob",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "EditJobPage",
                    component: EditJobPage,
                },
            ],
        },
        {
            path: "/:catchAll(.*)",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "NotFound",
                    component: NotFoundView,
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
