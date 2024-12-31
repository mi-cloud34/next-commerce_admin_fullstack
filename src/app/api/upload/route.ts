import { NextRequest, NextResponse } from "next/server";
import aws from "aws-sdk";
import formidable, { File } from "formidable";
import fs from "fs/promises";
import mongoose from "mongoose";
import Product from "@/lib/models/Product";
import { Readable } from "stream";
import { ObjectId } from "mongodb";

export const runtime = 'nodejs';
//export const bodyParser = false;

const uploadFileToS3 = async (file: File): Promise<string> => {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
  });

  const fileContent = await fs.readFile(file.filepath); 
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${Date.now()}_${file.originalFilename}`,
    Body: fileContent,
    ContentType: file.mimetype || "application/octet-stream",
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location; 
};


const toIncomingMessage = (req: NextRequest): NodeJS.ReadableStream => {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(req.body);
  readable.push(null);
  return Object.assign(readable, req);
};

export async function POST(req: NextRequest) {

  const form = new formidable.IncomingForm();

  try {
    
    const parseForm = (req: any) =>
      new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
        (resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
          });
        }
      );

    const { fields, files } = await parseForm(toIncomingMessage(req));

  
    const imgUrls: string[] = [];
    const uploadedFiles = Array.isArray(files.file)
      ? files.file
      : [files.file].filter(Boolean);

    for (const file of uploadedFiles) {
      const fileUrl = await uploadFileToS3(file as File);
      imgUrls.push(fileUrl);
    }

    
    const {
      name,
      description,
      price,
      brand,
      inStock,
      rating,
      categoryId,
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !brand ||
      !inStock ||
      !rating ||
      !categoryId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    let categoryObjectId:any;
    if (Array.isArray(categoryId)) {
        categoryObjectId = new ObjectId(categoryId[0]);
      } else {
        categoryObjectId = new ObjectId(categoryId);
      }
    
    const newProduct = await Product.create({
      name,
      description,
      price,
      brand,
      inStock,
      rating: Number(rating),
      categoryId:categoryObjectId,
      imgUrls,
    });

    return NextResponse.json(
      { message: "Product created successfully", data: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Error while processing the request", details: error.message },
      { status: 500 }
    );
  }
}
