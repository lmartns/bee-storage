import { Response } from "express";
import { FileUploadService } from "../../../domain/use-cases/file/upload-file/upload-file.service";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { CustomRequest } from "../../types/custom-request";

export class FileController {
  constructor(private readonly uploadFileService: FileUploadService) {}

  async uploadFile(req: CustomRequest, res: Response): Promise<Response> {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "Nenhum arquivo encontrado na requisição." });
    }

    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);

    const BUCKET_NAME = "beeBucket";
    const filePath = `${BUCKET_NAME}/${uniqueId}${extension}`;

    try {
      const output = await this.uploadFileService.execute({
        storageName: BUCKET_NAME,
        filePath: filePath,
        file: file.buffer,
      });

      return res.status(201).json({
        message: "Upload realizado com sucesso!",
        key: output.filePath,
        url: output.fullUrl,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Falha ao processar o upload.",
        error: error.message,
      });
    }
  }
}
