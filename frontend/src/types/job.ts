export interface Job {
    id?: string;
    company_id?: number;
    type: string;
    title: string;
    description: string;
    salary: string;
    location: string;
    company: {
        id?: number;
        user_id?: number;
        name: string;
        description: string;
        contact_email: string;
        contact_phone: string;
        created_at?: string;
        updated_at?: string;
    };
}
