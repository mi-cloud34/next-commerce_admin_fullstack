import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export  async function GET(request: NextRequest, res: NextResponse) {
  
    /* const text = "merhaba bugün nasılsın";
    const sourceLang = "tr";
    const targetLang = "en"; */
    const body=await request.json();
    const { text, sourceLang, targetLang } =body;
    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
    }

    try {
      const response = await axios.get(
        `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
      );
      
      // Axios ile gelen yanıtın loglanması
      console.log("sonuç", response.data);
      
      // Başarıyla çeviri yapıldıysa sonucu döndürüyoruz
    //  return res.status(200).json({ translation: response.data.translation });
      return NextResponse.json({
        msg:"UpdateSuccessful",response
      },{status:200}) 
      //res.status(200).json({ translation: response.data.translation });
    } catch (error) {
      console.error('Çeviri hatası:', error);
      return NextResponse.json({ msg: "Çeviri sırasında bir hata oluştu" }, { status: 400 });
      //return res.status(500).json({ error: 'Çeviri sırasında bir hata oluştu' });
    }
  //else {
   // res.setHeader('Allow', ['POST']);
   //return NextResponse.json({ msg: `Method ${req.method} Not Allowed` }, { status: 405 });
   // res.status(405).end(`Method ${req.method} Not Allowed`);
 // }
}
