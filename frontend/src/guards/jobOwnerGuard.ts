import api from "@/api";
import { useAuthStore } from "@/stores/auth";
import { useSnackbar } from "@/composables/useSnackbar";

export const jobOwnerGuard = async (to, from, next) => {
    const auth = useAuthStore();
    const { trigger } = useSnackbar();

    try {
        const jobId = to.params.id;
        const response = await api.get(`/jobs/${jobId}`);
        const job = response.data;

        // Check if the job belongs to the current user's company
        if (job.company?.user_id === auth.user?.id) {
            next();
        } else {
            trigger("You are not authorized to edit this job.", "error");
            next("/jobs");
        }
    } catch (error) {
        console.error("Access denied or job not found", error);
        trigger("Job not found or access denied.", "error");
        next("/jobs");
    }
};
