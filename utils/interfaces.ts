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
  isTonu: boolean;
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
}

export interface AddressProp {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
