export interface Job {
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}


  // export interface Job {
  //   id: string;
  //   title: string;
  //   type: string;
  //   location: string;
  //   description: string;
  //   salary: string;
  //   company: Company;
  // }