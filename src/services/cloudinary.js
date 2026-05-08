const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = () =>
  Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);

const RAW_FILE_TYPES = new Set([
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const isPdfFile = (file) =>
  file?.type === "application/pdf" || /\.pdf$/i.test(file?.name || "");

export const isPdfDocument = (file = {}) =>
  file?.type === "application/pdf" || /\.pdf($|\?)/i.test(file?.name || file?.url || "");

const preferredResourceTypeFor = (file) =>
  isPdfFile(file) ? "image" :
  RAW_FILE_TYPES.has(file.type) ? "raw" : "auto";

const PDF_PREVIEW_TRANSFORM = "/image/upload/pg_1,f_jpg,q_auto/";

export const cloudinaryPdfPreviewUrl = (url) => {
  if (!url || !url.includes("/image/upload/")) return url;
  const previewUrl = url.replace("/image/upload/", PDF_PREVIEW_TRANSFORM);
  return previewUrl.replace(/\.pdf($|\?)/i, ".jpg$1");
};

export const cloudinaryOriginalPdfUrl = (url) => {
  if (!url || !url.includes(PDF_PREVIEW_TRANSFORM)) return url;
  const originalUrl = url.replace(PDF_PREVIEW_TRANSFORM, "/image/upload/");
  return originalUrl.replace(/\.jpg($|\?)/i, ".pdf$1");
};

export const cloudinaryDocumentViewUrl = (file = {}) => {
  if (!isPdfDocument(file)) return file.previewUrl || file.url || file.previewImageUrl || "";

  const fullPdfUrl =
    file.previewUrl ||
    file.originalUrl ||
    file.url ||
    cloudinaryOriginalPdfUrl(file.previewImageUrl);

  return fullPdfUrl ? cloudinaryOriginalPdfUrl(fullPdfUrl) : "";
};

export const BLOCKED_DOCUMENT_MESSAGE =
  "This PDF cannot be opened because its original file URL is missing. Please re-upload this document.";

export const documentLinkProps = (file = {}) => ({
  href: cloudinaryDocumentViewUrl(file) || "#blocked-document",
  target: "_blank",
  rel: "noreferrer",
  onClick: (event) => {
    if (cloudinaryDocumentViewUrl(file)) return;
    event.preventDefault();
    alert(BLOCKED_DOCUMENT_MESSAGE);
  },
});

export const isBlockedCloudinaryPdf = (file = {}) =>
  isPdfDocument(file) &&
  !file.previewUrl &&
  !file.previewImageUrl &&
  String(file.url || "").includes("/raw/upload/");

const uploadWithResourceType = async (file, options, resourceType) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  if (options.folder) {
    formData.append("folder", options.folder);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed.");
  }

  return data;
};

export const uploadToCloudinary = async (file, options = {}) => {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env."
    );
  }

  const preferredResourceType = preferredResourceTypeFor(file);
  let data;

  try {
    data = await uploadWithResourceType(file, options, preferredResourceType);
  } catch (error) {
    if (preferredResourceType !== "raw") throw error;
    data = await uploadWithResourceType(file, options, "auto");
  }

  const isPdf = isPdfFile(file);
  return {
    name: file.name,
    url: data.secure_url,
    originalUrl: isPdf ? data.secure_url : undefined,
    previewImageUrl: isPdf ? cloudinaryPdfPreviewUrl(data.secure_url) : undefined,
    previewUrl: URL.createObjectURL(file),
    type: file.type || data.resource_type,
    publicId: data.public_id,
    resourceType: data.resource_type,
    bytes: data.bytes,
  };
};


