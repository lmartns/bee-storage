import { SupabaseStorageProvider } from "../../../../infrastructure/providers/supabase.storage-provider";
import {
  UploadFileUseCase,
  UploadFileUseCaseInput,
  UploadFileUseCaseOutput,
} from "./upload-file.use-case";

export class FileUploadService implements UploadFileUseCase {
  constructor(private readonly storageProvider: SupabaseStorageProvider) {}

  async execute(
    input: UploadFileUseCaseInput,
  ): Promise<UploadFileUseCaseOutput> {
    return await this.storageProvider.upload({
      bucketName: input.storageName,
      filePath: input.filePath,
      file: input.file,
      options: { cacheControl: "3600", upsert: false },
    });
  }
}
