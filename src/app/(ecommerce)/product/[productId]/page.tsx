
import React, { useEffect } from 'react'
import axios from 'axios';
import { setLoading } from '@/redux/Features/loadingSlice';
import ProductDetail from '../../components/detail/ProductDetail';
import { getProducts } from '@/app/action/getProduct';  
import { useParams } from 'next/navigation';

type DetailProps = {
    params: {productId : string}
}

const Product = async ({params}: DetailProps) => { 

     const product = await getProducts(params.productId)// API endpoint

 return (
    <div>
    {!product ? (
      <div>Loading...</div> // Yükleme durumu
    ) : (
      <ProductDetail  product={product[0]} />
    )}
  </div>
  )
}
export default Product;