import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JobsView from "../views/JobsView.vue";
import JobDetailsView from "../views/JobDetailsView.vue";
import AddJobPage from "../views/AddJobPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
import NotFoundView from "../views/NotFoundView.vue";
import EditJobPage from "../views/EditJobPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: MainLayout,
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
            children: [
                {
                    path: "", // catches everything under /:catchAll
                    name: "NotFound",
                    component: NotFoundView,
                },
            ],
        },
    ],
});

export default router;
