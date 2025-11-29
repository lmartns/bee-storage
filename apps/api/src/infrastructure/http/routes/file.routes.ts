import { Router } from "express";
import { FileController } from "../controllers/file.controller";
import { SupabaseStorageProvider } from "../../providers/supabase.storage-provider";
import { FileUploadService } from "../../../domain/use-cases/file/upload-file/upload-file.service";
import { supabaseClient } from "../../clients/supabase.client"; 
import multer from "multer";
export const fileRoutes = Router();

const uploadMiddleware = multer({ storage: multer.memoryStorage() });

const storageProvider = new SupabaseStorageProvider(supabaseClient); 
const uploadFileService = new FileUploadService(storageProvider); 

export const fileController = new FileController(uploadFileService);

fileRoutes.post(
    "/upload", 
    uploadMiddleware.single('file'), 
    (req, res) => fileController.uploadFile(req as any, res) 
);