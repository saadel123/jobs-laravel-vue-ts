import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import JobsView from "../views/jobs/JobsView.vue";
import JobDetailsView from "../views/jobs/JobDetailsView.vue";
import AddJobPage from "../views/jobs/AddJobPage.vue";
import MyJobsView from "../views/profile/MyJobsView.vue";
import MainLayout from "../views/layouts//MainLayout.vue";
import NotFoundView from "../views/not-found/NotFoundView.vue";
import EditJobPage from "../views/jobs/EditJobPage.vue";
import LoginView from "@/views/auth/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import RegisterView from "@/views/auth/RegisterView.vue";
import { jobOwnerGuard } from "@/guards/jobOwnerGuard";
import { useSnackbar } from "@/composables/useSnackbar";
import UserProfile from "@/views/profile/UserProfile.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/login",
            name: "Login",
            component: MainLayout,
            children: [
                {
                    path: "",
                    name: "LoginPage",
                    component: LoginView,
                },
            ],
        },
        {
            path: "/register",
            name: "Register",
            component: MainLayout,
            children: [
                {
                    path: "",
                    name: "RegisterPage",
                    component: RegisterView,
                },
            ],
        },
        {
            path: "/",
            name: "Home",
            component: MainLayout,
            // meta: { requiresAuth: true },
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
            // meta: { requiresAuth: true },
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
            // meta: { requiresAuth: true },
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
            beforeEnter: jobOwnerGuard,
            children: [
                {
                    path: "",
                    name: "EditJobPage",
                    component: EditJobPage,
                },
            ],
        },
        {
            path: "/profile/jobs",
            name: "MyJobs",
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    name: "MyJobsView",
                    component: MyJobsView,
                },
            ],
        },
        {
            path: '/profile/user',
            name: 'UserProfile',
            component: MainLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'UserProfileView',
                    component: UserProfile
                }
            ]
        },
        {
            path: "/:catchAll(.*)",
            component: MainLayout,
            // meta: { requiresAuth: true },
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
        // Trigger snackbar ONLY for the add job route
        if (to.name === "AddJobPage") {
            const { trigger } = useSnackbar();
            trigger("Please connect first to add a job", "error");
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
