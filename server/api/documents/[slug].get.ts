import fs from "fs";
import path from "path";
import mammoth from "mammoth";

export default defineEventHandler(async (event) => {
  const rawSlug = getRouterParam(event, "slug");

  if (!rawSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Document slug is required",
    });
  }

  // Декодируем URL-кодированный slug
  const slug = decodeURIComponent(rawSlug);

  try {
    const documentsDir = path.join(process.cwd(), "public");
    const files = fs.readdirSync(documentsDir);

    // Находим файл по слагу
    const docxFile = files.find((file: string) => {
      const fileSlug = file
        .replace(".docx", "")
        .toLowerCase()
        .replace(/\s+/g, "-");
      return fileSlug === slug && file.endsWith(".docx");
    });

    if (!docxFile) {
      throw createError({
        statusCode: 404,
        statusMessage: "Document not found",
      });
    }

    const filePath = path.join(documentsDir, docxFile);

    // Конвертируем Word документ в HTML
    const result = await mammoth.convertToHtml({ path: filePath });
    const html = result.value;
    const messages = result.messages;

    // Получаем информацию о файле
    const stats = fs.statSync(filePath);
    const name = docxFile.replace(".docx", "");

    return {
      id: slug,
      name,
      filename: docxFile,
      html,
      size: stats.size,
      modified: stats.mtime,
      messages: messages.length > 0 ? messages : undefined,
    };
  } catch (error: unknown) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    console.error("Error loading document:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load document",
    });
  }
});
