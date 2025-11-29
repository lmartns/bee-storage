export interface UploadFileUseCaseInput {
  storageName: string;
  filePath: string;
  file: string | Buffer | File;
}

export interface UploadFileUseCaseOutput {
  filePath: string;
  fullUrl: string;
}

export abstract class UploadFileUseCase {
  abstract execute(
    input: UploadFileUseCaseInput,
  ): Promise<UploadFileUseCaseOutput>;
}
