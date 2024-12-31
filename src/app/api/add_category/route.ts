import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs/promises";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import Category from "@/lib/models/Category";

/* export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
}; */
export const runtime = 'nodejs';
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const uploadFileToS3 = async (
  folder: string,
  filePath: string,
  fileName: string,
  contentType: string
): Promise<string> => {
  const fileContent = await fs.readFile(filePath);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${folder}/${fileName}`,
    Body: fileContent,
    ContentType: contentType,
  });

  await s3.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`;
};

const convertNextRequestToIncomingMessage = async (
  req: NextRequest
): Promise<IncomingMessage> => {
  const bodyBuffer = await req.arrayBuffer(); 
  const readable = new Readable();
  readable._read = () => {};
  readable.push(Buffer.from(bodyBuffer));
  readable.push(null);

  const incomingMessage = readable as unknown as IncomingMessage;
  incomingMessage.headers = Object.fromEntries(req.headers.entries());
  incomingMessage.method = req.method;
  incomingMessage.url = req.url;

  return incomingMessage;
};

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: false });

  try {
    const parseForm = () =>
      new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
        async (resolve, reject) => {
          const incomingMessage = await convertNextRequestToIncomingMessage(req);
          form.parse(incomingMessage, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
          });
        }
      );

    const { fields, files } = await parseForm();
    console.log("Parsed Fields:", fields);
    console.log("Parsed Files:", files);

    
    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    const file = fileArray[0]; 
    
 

    if (!file || !file.filepath || !file.originalFilename || !file.mimetype) {
      return NextResponse.json({ error: "Invalid file uploaded" }, { status: 400 });
    }

    const fileUrl = await uploadFileToS3(
      "category",
      file.filepath,
      file.originalFilename,
      file.mimetype
    );

    const { name } = fields;

    if (!name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newCategory = await Category.create({
      name: String(name),
      imgUrl:String(fileUrl),
    });

    return NextResponse.json(
      { message: "Category created successfully", data: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

