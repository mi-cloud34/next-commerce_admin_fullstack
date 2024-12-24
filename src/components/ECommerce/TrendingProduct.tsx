
import { useSession } from 'next-auth/react';
import React from 'react'

interface IProduct{
    imgSrc:string;
    name:string;
    category:string;
    price:number;
}
const TrendingProduct =  () => {
  const { data: session, status } = useSession();

    
  return (
    <div>
      merhaba
      {session?(<span>{session.user?.name}</span>):(<span>Loginnnnnn</span>)} 
    </div>
  );
}

export default TrendingProduct