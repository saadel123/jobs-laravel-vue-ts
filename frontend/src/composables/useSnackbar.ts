import { ref } from "vue";

const show = ref(false);
const message = ref("");
const color = ref("success");

export const useSnackbar = () => {
    const trigger = (msg: string, type: string = "success") => {
        message.value = msg;
        color.value = type;
        show.value = true;
    };

    return {
        show,
        message,
        color,
        trigger,
    };
};
