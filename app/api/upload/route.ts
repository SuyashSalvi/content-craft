import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import formidable, { Fields, Files, File } from "formidable";
import { Readable } from "stream";

// Disable default body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert the Next.js `Request` object to a Node.js `IncomingMessage`-compatible stream
function toNodeStream(req: Request): Readable {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Invalid request body");

  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });
}

// Handle the POST request
export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Ensure the uploads directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // Set max file size to 10 MB
    headers: {
      "content-length": req.headers.get("content-length") || "0", // Add content-length
      "content-type": req.headers.get("content-type") || "", // Add content-type
    },
  });

  const parsedForm = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    form.parse(toNodeStream(req) as any, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });

  const { files } = parsedForm;

  // Handle the uploaded file(s)
  const file = Array.isArray(files.image) ? files.image[0] : (files.image as File | undefined);

  if (!file?.filepath) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  // Return the public file path
  const filePath = `/uploads/${path.basename(file.filepath)}`;
  return NextResponse.json({ filePath }, { status: 200 });
}
