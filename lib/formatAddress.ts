import { AddressProp } from "utils/interfaces";

const formatAddress = (data: AddressProp) => {
  return `${data.address1}, ${data.city}, ${data.state} ${data.zipCode}`;
};

export default formatAddress;
