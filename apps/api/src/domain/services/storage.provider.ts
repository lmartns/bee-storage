export abstract class StorageProvider {
  abstract connectClient(url: string, key: string): Promise<void>;
}
