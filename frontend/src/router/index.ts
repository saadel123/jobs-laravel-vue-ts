import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JobsView from "../views/JobsView.vue";
import JobDetailsView from "../views/JobDetailsView.vue";
import AddJobPage from "../views/AddJobPage.vue";
import MainLayout from "../layouts/MainLayout.vue";

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
      path: "/add-job",
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
  ],
});

export default router;
