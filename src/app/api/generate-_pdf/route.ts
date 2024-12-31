
import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); 
    const { html } = body;

    if (!html) {
      return NextResponse.json({ message: "HTML content is required" }, { status: 400 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=order-details.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

/* import { create } from "html-pdf-node";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); 
    const { html } = body;

    if (!html) {
      return NextResponse.json({ message: "HTML content is required" }, { status: 400 });
    }

    const file = { content: html };
    const options = { format: "A4" };

    return new Promise<NextResponse>((resolve, reject) => {
      create(file, options).toBuffer((err, buffer) => {
        if (err) {
          reject(new NextResponse("Error generating PDF", { status: 500 }));
          return;
        }

        resolve(
          new NextResponse(buffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": "attachment; filename=order-details.pdf",
            },
          })
        );
      });
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

 */