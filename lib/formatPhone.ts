const formatPhoneNumber = (str: string) => {

  //Check if the input is of correct length
  const match = str.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};

export default formatPhoneNumber;
