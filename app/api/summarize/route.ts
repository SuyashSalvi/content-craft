// import { NextResponse } from "next/server";
// import formidable, { File, Files } from "formidable";
// import { IncomingMessage } from "http";
// import { Readable } from "stream";
// import fs from "fs/promises";
// import vision from "@google-cloud/vision";

// const client = new vision.ImageAnnotatorClient();

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing
//   },
// };


// // const createMockIncomingMessage = async (req: Request): Promise<IncomingMessage> => {
// //   const reader = req.body?.getReader();
// //   const stream = new Readable({
// //     async read() {
// //       while (reader) {
// //         const { done, value } = await reader.read();
// //         if (done) {
// //           this.push(null); // End of stream
// //           break;
// //         }
// //         this.push(Buffer.from(value));
// //       }
// //     },
// //   });




// //   const headers = Object.fromEntries(req.headers.entries()); // Correctly convert headers
// //   return Object.assign(stream, {
// //     headers,
// //     method: req.method,
// //     url: req.url,
// //   }) as IncomingMessage;
// // };





// export async function POST(req: Request) {
//   // const nodeReq = await createMockIncomingMessage(req);
//   // console.log("Received request:", req);
//   // const form = formidable({
//   //   multiples: false,
//   //   keepExtensions: true,
//   // });
//   // console.log("Parsing form...");
//   // try {
//   //   const { files } = await new Promise<{ files: Files }>((resolve, reject) => {
//   //     form.parse(nodeReq, (err, _, files) => {
//   //       if (err) {
//   //         console.error("Form parsing error:", err);
//   //         return reject(err);
//   //       }
//   //       console.log("Parsed files:", files);
//   //       resolve({ files });
//   //     });
//   //   });
  
//   //   console.log("Files parsed successfully:", files);
  
//   //   const fileKey = Object.keys(files).find((key) => Array.isArray(files[key]) || files[key]);
//   //   const file = fileKey ? (Array.isArray(files[fileKey]) ? files[fileKey][0] : files[fileKey]) : undefined;
  
//   //   if (!file) {
//   //     console.error("No valid file found in uploaded files:", files);
//   //     return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
//   //   }
  
//   //   console.log("Uploaded file details:", file);
  
//   //   const imageBuffer = await fs.readFile(file.filepath);
//   //   console.log("File successfully read. Buffer length:", imageBuffer.length);
  
//   //   const [result] = await client.labelDetection({
//   //     image: { content: imageBuffer.toString("base64") },
//   //   });
  
//   //   console.log("Google Cloud Vision API response:", result);
  
//   //   const labels = result.labelAnnotations;
//   //   if (!labels || labels.length === 0) {
//   //     console.warn("No labels detected by Google Cloud Vision API.");
//   //     return NextResponse.json({ summary: "No labels detected in the image." });
//   //   }
  
//   //   const summary = labels
//   //     .slice(0, 3)
//   //     .map((label) => label.description)
//   //     .join(", ");
  
//   //   console.log("Generated summary:", summary);
  
//   //   return NextResponse.json({ summary: `This image seems to depict: ${summary}.` });
//   // } catch (error) {
//   //   console.error("Error during file processing:", error);
//   //   return NextResponse.json({ error: "Error processing the image." }, { status: 500 });
//   // }
  

//   const formData = await req.formData();
//   const img = formData.get('image');
//   console.log("Recevied image: ",img);
//   return NextResponse.json(req)
// }














import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

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
