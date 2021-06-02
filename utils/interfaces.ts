export interface InvoiceProp {
  id: number;
  date: string;
  broker: BrokerProp;
  load: {
    id: string;
    shipper: JobProp;
    cosigner: JobProp;
  };
  rate: number;
  additionalItems: {
    title: string;
    amount: number;
  }[];
}

export interface BrokerProp {
  id: string;
  name: string;
  dba?: string;
  address: AddressProp;
  phone: string;
  fax: string;
  billingEmail: string;
  acountingEmail: string;
  terms: string;
}

interface JobProp {
  name: string;
  address: AddressProp;
  date: string;
}

interface AddressProp {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
