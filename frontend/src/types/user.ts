export interface Academic {
  id: string;
  school: string;
  userId: string;
}

export interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
}

export interface Contact {
  id: string;
  email: string;
  phoneNumber: string;
  fax?: string | null;
  linkedInUrl?: string | null;
  userId: string;
}

export interface User {
  id: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  academics: Academic[];
  address: Address;
  contact: Contact;
}

export interface UserFormData {
  id: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  academics: string[];
  email: string;
  phoneNumber: string;
  fax?: string | null;
  linkedInUrl?: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: boolean;
}
