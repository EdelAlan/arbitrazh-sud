import fs from "fs";
import path from "path";

interface DocumentInfo {
  id: string;
  name: string;
  filename: string;
  size: number;
  modified: Date;
  path: string;
}

export default defineEventHandler(async (_event) => {
  try {
    const documentsDir = path.join(process.cwd(), "public");
    const files = fs.readdirSync(documentsDir);

    const docxFiles = files.filter((file: string) => file.endsWith(".docx"));

    const documents = await Promise.all(
      docxFiles.map(async (filename: string): Promise<DocumentInfo | null> => {
        const filePath = path.join(documentsDir, filename);
        const slug = filename
          .replace(".docx", "")
          .toLowerCase()
          .replace(/\s+/g, "-");

        try {
          // Получаем базовую информацию о файле
          const stats = fs.statSync(filePath);
          const name = filename.replace(".docx", "");

          return {
            id: slug,
            name,
            filename,
            size: stats.size,
            modified: stats.mtime,
            path: `/documents/${slug}`,
          };
        } catch (fileError) {
          console.error(`Error processing ${filename}:`, fileError);
          return null;
        }
      })
    );

    return documents.filter((doc: DocumentInfo | null) => doc !== null);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load documents",
    });
  }
});
