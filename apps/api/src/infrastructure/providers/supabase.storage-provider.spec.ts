import { SupabaseStorageProvider } from "./supabase.storage-provider.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { jest, describe, it, expect } from "@jest/globals";

describe("SupabaseStorageProvider Unit Test", () => {
  let supabaseClient: SupabaseClient;
  let storageProvider: SupabaseStorageProvider;

  const mockUpload = jest.fn();
  const mockGetPublicUrl = jest.fn();
  const mockFrom = jest.fn((bucket: string) => ({
    upload: mockUpload,
    getPublicUrl: mockGetPublicUrl,
  }));

  beforeEach(() => {
    supabaseClient = {
      storage: {
        from: mockFrom,
      },
    } as unknown as SupabaseClient;

    storageProvider = new SupabaseStorageProvider(supabaseClient);
    jest.clearAllMocks();
  });

  it("should upload a file successfully", async () => {
    const params = {
      bucketName: "test-bucket",
      filePath: "path/to/file.txt",
      file: Buffer.from("test content"),
      options: {},
    };

    mockUpload.mockResolvedValue({
      data: { path: "path/to/file.txt" },
      error: null,
    });
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: "https://example.com/path/to/file.txt" },
    });

    const result = await storageProvider.upload(params);

    expect(mockFrom).toHaveBeenCalledWith(params.bucketName);
    expect(mockUpload).toHaveBeenCalledWith(
      params.filePath,
      params.file,
      params.options,
    );
    expect(result).toEqual({
      filePath: "path/to/file.txt",
      fullUrl: "https://example.com/path/to/file.txt",
    });
  });

  it("should throw an error if upload fails", async () => {
    const params = {
      bucketName: "test-bucket",
      filePath: "path/to/file.txt",
      file: Buffer.from("test content"),
      options: {},
    };

    mockUpload.mockResolvedValue({
      data: null,
      error: { message: "Upload error" },
    });

    await expect(storageProvider.upload(params)).rejects.toThrow(
      "Upload failed: Upload error",
    );
  });
});
