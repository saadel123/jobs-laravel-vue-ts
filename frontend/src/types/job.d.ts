export interface Job {
    id?: string;
    type: string;
    title: string;
    description: string;
    salary: string;
    location: string;
    company: {
        name: string;
        description: string;
        contact_email: string;
        contact_phone: string;
    };
}
