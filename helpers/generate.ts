import crypto from "crypto"
export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
};


export const generateRandomNumber = (length:number):string => {
  let min = Math.pow(10,length-1)
  let max = Math.pow(10,length)
  const result = crypto.randomInt(min,max).toString()
  return result;
};
