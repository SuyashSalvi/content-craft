import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {
  try {
    // Extract FormData
    const formData = await req.formData();

    // Get the uploaded image
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof Blob)) {
      return NextResponse.json({ error: "No image file uploaded." }, { status: 400 });
    }

    console.log("Uploaded file:", imageFile);

    // Convert the Blob to a Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Buffer length:", buffer.length);

    // Send the image to Google Vision API
    const [result] = await client.labelDetection({
      image: { content: buffer.toString("base64") },
    });

    console.log("Google Cloud Vision API response:", result);

    const labels = result.labelAnnotations;
    if (!labels || labels.length === 0) {
      return NextResponse.json({ summary: "No labels detected in the image." });
    }

    // Create a summary from the labels
    const summary = labels
      .slice(0, 3)
      .map((label) => label.description)
      .join(", ");

    return NextResponse.json({ summary: `This image seems to depict: ${summary}.` });
  } catch (error) {
    console.error("Error processing the image:", error);
    return NextResponse.json({ error: "Error processing the image." }, { status: 500 });
  }
}
