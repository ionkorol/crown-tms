export interface LoadProp {
  id: number;
  references: {
    name: string;
    value: string;
  }[];
  isTonu: boolean;
  jobs: JobProp[];
  rate: number;
  createdAt: number;
  notes: string[];
  status: "In Progress" | "Complete";
  invoice?: InvoiceProp;
  broker: BrokerProp;
  driver?: DriverProp;
  vehicle?: VehicleProp;
}

export interface InvoiceProp {
  id: number;
  createdAt: number;
  status: "Generated" | "Pending" | "Paid";
  balance: number;
  additionalItems: {
    title: string;
    amount: number;
  }[];
  load?: LoadProp;
  broker?: BrokerProp;
}

export interface BrokerProp {
  id: string;
  name: string;
  dba?: string;
  mc: string;
  usdot: string;
  address: AddressProp;
  phone: string;
  fax: string;
  billingEmail: string;
  accountingEmail: string;
  terms: string;
}

export interface JobProp {
  name: string;
  address: AddressProp;
  date: string;
  type: "Pick" | "Drop";
}

export interface AddressProp {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserProp {
  id: string;
  clientId: string;
  name: string;
}

export interface ClientProp {
  id: string;
  loads: LoadProp[];
  invoices: InvoiceProp[];
  users: string[];
}

export interface FileProp {
  id?: string;
  createdAt: number;
  type: "RC" | "BOL" | "POD" | "Invoice";
  fileName: string;
  uploadedBy: string;
  ref: string;
}

export interface DriverProp {
  id: string;
  firstName: string;
  lastName: string;
  address: AddressProp;
  createdAt: number;
}
export interface VehicleProp {
  id: string;
  createdAt: number;
  vin: string;
  year: number;
  make: string;
  model: string;
  type: string;
}
