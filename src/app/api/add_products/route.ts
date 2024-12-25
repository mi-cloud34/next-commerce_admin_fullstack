import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs/promises";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import mongoose from "mongoose";
import Product from "@/lib/models/Product";
import { ObjectId } from "mongodb";

/* export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
}; */
export const runtime = 'nodejs';
//export const bodyParser = false;

// AWS S3 v3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  
  // Helper to upload a file to S3
  const uploadFileToS3 = async (folder:string,filePath: string, fileName: string, contentType: string): Promise<string> => {
    const fileContent = await fs.readFile(filePath);
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${folder}/${fileName}`,
      Body: fileContent,
      ContentType: contentType,
    });
  
    await s3.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${Date.now()}`;
  };
// Convert NextRequest to IncomingMessage
// Helper function to convert ReadableStream to Buffer
const streamToBuffer = async (stream: ReadableStream): Promise<Buffer> => {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;
  
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = streamDone;
    }
  
    return Buffer.concat(chunks);
  };
  
  // Modify convertNextRequestToIncomingMessage
  const convertNextRequestToIncomingMessage = async (req: NextRequest): Promise<IncomingMessage> => {
    const bodyBuffer = await streamToBuffer(req.body!); // Convert ReadableStream to Buffer
  
    const readable = new Readable();
    readable._read = () => {};
    readable.push(bodyBuffer);
    readable.push(null);
  
    const incomingMessage = readable as unknown as IncomingMessage;
    incomingMessage.headers = Object.fromEntries(req.headers.entries());
    incomingMessage.method = req.method;
    incomingMessage.url = req.url;
  
    return incomingMessage;
  };
  

// `POST` handler
export async function POST(req: NextRequest) {
  const form = formidable({ multiples: true });

  try {
    const parseForm = () =>
        new Promise<{ fields: formidable.Fields; files: formidable.Files }>(async (resolve, reject) => {
            const incomingMessage = await convertNextRequestToIncomingMessage(req);
            form.parse(incomingMessage, (err, fields, files) => {
              if (err) reject(err);
              resolve({ fields, files });
            });
          });

    const { fields, files } = await parseForm();
    console.log("Parsed Fields:", fields);
    console.log("Parsed Files:", files);

    // Upload files to S3 and collect URLs
    const imgUrls: string[] = [];
    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];
    for (const file of uploadedFiles) {
      if (file?.filepath && file?.originalFilename && file?.mimetype) {
        const fileUrl = await uploadFileToS3("product",file.filepath, file.originalFilename, file.mimetype);
        imgUrls.push(fileUrl);
      }
    }

    const { name, description, price, brand, inStock, rating, categoryId } = fields;

    if (!name || !description || !price || !brand || !inStock || !rating || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let categoryObjectId:any;
    if (Array.isArray(categoryId)) {
        categoryObjectId = new ObjectId(categoryId[0]); // İlk öğeyi al
      } else {
        categoryObjectId = new ObjectId(categoryId);
      }
    const newProduct = await Product.create({
      name:String(name),
      description:String(description),
      price: Number(price),
      brand:String(brand),
      inStock: Number(inStock),
      rating: Number(rating),
      categoryId: categoryObjectId,
      imgUrls,
    });

    return NextResponse.json({ message: "Product created successfully", data: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


/* import Product from "@/lib/models/Product";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export async function POST(request:NextRequest){
    try {
        const body=await request.json();
        const {name,description,categoryId,brand,price,inStock,rating}=body;
        console.log("body",body);
        
        if (!name || !description || !categoryId || !brand || !price || !inStock || !rating) {
            return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
          }
      
          // Ensure categoryId is treated as an ObjectId
          const categoryObjectId = new ObjectId(categoryId);
      
        
        await connectMongoDb();
        const data=await Product.create({
            name,description, categoryId: categoryObjectId,brand,price,inStock,rating
        })
       
        

        console.log("data",data);
        
    return NextResponse.json({msg:"UpdateSuccessful",data})
    } catch (error) {
        return NextResponse.json({
            error,
            msg:"Something wrong"
        },
    {status:400}
    )
    }
} */