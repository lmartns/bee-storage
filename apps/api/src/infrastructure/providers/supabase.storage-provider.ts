import { SupabaseClient } from "@supabase/supabase-js";

interface UploadFileParams {
  bucketName: string;
  filePath: string;
  file: string | File | Buffer;
  options: object;
}

interface UploadFileResult {
  filePath: string;
  fullUrl: string;
}

export class SupabaseStorageProvider {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async upload(params: UploadFileParams): Promise<UploadFileResult> {
    const { bucketName, filePath, file, options } = params;

    const { data: uploadData, error } = await this.supabaseClient.storage
      .from(bucketName)
      .upload(filePath, file, options);

    if (error || !uploadData) {
      throw new Error(`Upload failed: ${error?.message || "Unknown error"}`);
    }

    const { data: publicUrlData } = this.supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(uploadData.path);

    return {
      filePath: uploadData.path,
      fullUrl: publicUrlData.publicUrl,
    };
  }
}
