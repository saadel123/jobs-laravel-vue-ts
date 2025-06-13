export function getJobTypeColor(type: string): string {
    switch (type.toLowerCase()) {
        case "full-time":
            return "blue";
        case "part-time":
            return "orange";
        case "internship":
            return "purple";
        case "remote":
            return "green";
        case "freelance":
            return "grey";
        default:
            return "grey";
    }
}
