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
    // В Cloudflare Workers используем статический список документов
    const documentsData = [
      {
        filename: "Регламент 2025.docx",
        size: 71564,
        modified: new Date("2025-11-12T13:03:50.414Z"),
      },
      {
        filename: "Реестр.docx",
        size: 15055,
        modified: new Date("2025-11-12T13:03:50.375Z"),
      },
    ];

    const documents = documentsData.map((docData) => {
      const slug = docData.filename
        .replace(".docx", "")
        .toLowerCase()
        .replace(/\s+/g, "-");
      const name = docData.filename.replace(".docx", "");

      return {
        id: slug,
        name,
        filename: docData.filename,
        size: docData.size,
        modified: docData.modified,
        path: `/documents/${slug}`,
      };
    });

    return documents;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load documents",
    });
  }
});
