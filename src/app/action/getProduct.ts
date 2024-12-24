import axios from "axios";

export const getProducts = async (productId:string) => {
    const products =  await axios.get(`${process.env.BASE_URL}/api/get_product/${productId}`); 
    console.log("",products)
    return  products.data;
  }