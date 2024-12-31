
import Order from "@/lib/models/Order";
import {connectMongoDb} from "@/lib/MongoConnect"
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Customer from "@/lib/models/Customer";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
      
export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      const customerInfo = {
        id: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      }

      const shippingAddress = {
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        state: session?.shipping_details?.address?.state,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      }

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"]}
      )

      const lineItems = await retrieveSession?.line_items?.data

      const orderItems = lineItems?.map((item: any) => {
        return {
          product: item.price.product.metadata.productId,
          color: item.price.product.metadata.color || "N/A",
          size: item.price.product.metadata.size || "N/A",
          quantity: item.quantity,
        }
      })

     await connectMongoDb()
     
      const newOrder = new Order({
        customerId: customerInfo.id,
        products: orderItems,
        shippingAddress,
        shippingRate: session?.shipping_cost?.shipping_rate,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      })

      await newOrder.save()

      let customer = await Customer.findOne({ _id: customerInfo.id })

      if (customer) {
        customer.orders.push(newOrder._id)
      } else {
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
        })
      }
  const transporter = nodemailer.createTransport({
             host: process.env.EMAIL_SERVER_HOST,
             port: Number(process.env.EMAIL_SERVER_PORT),
             auth: {
                 user: process.env.EMAIL_SERVER_USER,
                 pass: process.env.EMAIL_SERVER_PASSWORD,
             },
         });
  
  
   
         const emailHtml = `
         <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
           <h2>Merhaba ${customer.name},</h2>
           <p>Siparişiniz başarıyla tamamlandı! Sipariş detaylarınız aşağıda yer almaktadır:</p>
           <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
             <thead>
               <tr>
                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Ürün Adı</th>
                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Renk</th>
                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Beden</th>
                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Adet</th>
                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Fiyat</th>
               </tr>
             </thead>
             <tbody>
               ${orderItems!
                 .map(
                   (item: any) => `
                   <tr>
                     <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                     <td style="border: 1px solid #ddd; padding: 8px;">${item.color}</td>
                     <td style="border: 1px solid #ddd; padding: 8px;">${item.size}</td>
                     <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                     <td style="border: 1px solid #ddd; padding: 8px;">$${item.price}</td>
                   </tr>
                 `
                 )
                 .join("")}
             </tbody>
           </table>
           <p style="margin-top: 20px;">Toplam Tutar: <strong>$${newOrder.totalAmount.toFixed(2)}</strong></p>
           <p>Teşekkür ederiz!<br> <strong>Your Company</strong></p>
           <a 
             href="http://localhost:4000//api/generate_pdf" 
             style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">
             Sipariş Detaylarını PDF Olarak İndir
           </a>
         </div>`;
         
      // E-posta gönderme
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: customer.email,
        subject: "Ürün Detayı - Siparişleriniz Başarıyla Tamamlandı",
        html:emailHtml,
      });
    
     
          
     
      await customer.save()
    }

    return new NextResponse("Order created", { status: 200 })
  } catch (err) {
    console.log("[webhooks_POST]", err)
    return new NextResponse("Failed to create the order", { status: 500 })
  }
}