export const numberWithCommas = (number, comma = ',')=>{
  return number.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    comma,
  );
};

export default numberWithCommas;
