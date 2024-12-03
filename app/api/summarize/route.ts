import { NextResponse } from "next/server";
import formidable, { File, Files } from "formidable";
import { IncomingMessage } from "http";
import { Readable } from "stream";
import fs from "fs/promises";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

const createMockIncomingMessage = (req: Request): IncomingMessage => {
  const readable = new Readable({
    read() {
      req.body?.getReader().read().then(({ done, value }) => {
        if (done) {
          this.push(null); // End of stream
        } else {
          this.push(Buffer.from(value));
        }
      });
    },
  });

  const headers = Object.fromEntries(req.headers);

  return {
    ...readable,
    headers,
    method: req.method,
    url: req.url,
    httpVersion: "1.1",
    httpVersionMajor: 1,
    httpVersionMinor: 1,
  } as unknown as IncomingMessage;
};

export async function POST(req: Request) {
  const nodeReq = createMockIncomingMessage(req);

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise<{
      fields: Record<string, any>;
      files: Files;
    }>((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) {
          console.error("Form parsing error:", err);
          reject(err);
        } else {
          console.log("Parsed fields:", fields);
          console.log("Parsed files:", files);
          resolve({ fields, files });
        }
      });
    });

    const fileKey = Object.keys(files).find((key) => Array.isArray(files[key]) || files[key]);
    const file = fileKey ? (Array.isArray(files[fileKey]) ? files[fileKey][0] : files[fileKey]) : undefined;

    if (!file) {
      console.error("No valid file found in uploaded files:", files);
      return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
    }

    console.log("Uploaded file details:", file);

    const imageBuffer = await fs.readFile(file.filepath);
    console.log("File successfully read. Buffer length:", imageBuffer.length);

    const [result] = await client.labelDetection({
      image: { content: imageBuffer.toString("base64") },
    });

    console.log("Google Cloud Vision API response:", result);

    const labels = result.labelAnnotations;
    if (!labels || labels.length === 0) {
      console.warn("No labels detected by Google Cloud Vision API.");
      return NextResponse.json({ summary: "No labels detected in the image." });
    }

    const summary = labels
      .slice(0, 3)
      .map((label) => label.description)
      .join(", ");

    console.log("Generated summary:", summary);

    return NextResponse.json({ summary: `This image seems to depict: ${summary}.` });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json({ error: "Error processing the image." }, { status: 500 });
  }
}
