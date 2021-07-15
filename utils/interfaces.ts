export interface LoadProp {
  // Misc
  id: number;
  createdAt: number;

  // General
  status: "Booked" | "Dispatched" | "In Transit" | "Completed";
  branch: ClientBranchProp;
  references: {
    name: string;
    value: string;
  }[];
  lineItems: LoadLineItemProp[];
  notes: string[];

  // Jobs
  jobs: JobProp[];

  // Attachements
  invoice?: InvoiceProp;
  broker: BrokerProp;
  driver?: DriverProp;
  vehicle?: VehicleProp;
}

export interface LoadLineItemProp {
  title:
    | "Line Haul"
    | "Tolls"
    | "Lumper"
    | "Fuel"
    | "Mileage"
    | "Deadhead"
    | "Extra Stops";
  quantity: number;
  rate: number;
  total: number;
  notes: string;
}

export interface InvoiceProp {
  // Misc
  id: number;
  createdAt: number;

  // General
  status: "Generated" | "Pending" | "Paid";
  payments: {
    date: number;
    method: string;
    referece: string;
    amount: number;
    notes: string;
  }[];
  balance: number;
  notes: string;
  // Attachements
  branch?: ClientBranchProp;
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
  users: string[];
  branches: string[];
  loads?: LoadProp[];
  invoices?: InvoiceProp[];
}

export interface ClientBranchProp {
  id: string;
  // Info
  name: string;
  dba?: string;
  mc: string;
  usdot: string;
  // Contact
  address: AddressProp;
  phone: string;
  fax: string;
  dispatchEmail: string;
  accountingEmail: string;
}

export interface DocumentProp {
  id?: string;
  createdAt: number;
  type: "RC" | "BOL" | "POD" | "Invoice";
  uploadedBy: string;
  ref: string;
  entity: EntityProp;
}

export interface EntityProp {
  type: "Load" | "Invoice" | "Driver" | "Vehicle";
  id: string;
}

export interface DriverProp {
  id: string;
  firstName: string;
  lastName: string;
  address: AddressProp;
  phone: string;
  email: string;
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
