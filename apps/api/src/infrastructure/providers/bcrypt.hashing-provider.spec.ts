import { BcryptHashingProvider } from "./bcrypt.hashing-provider.js";

describe("BcryptHashingProvider Unit Test", () => {
  const hashingProvider = new BcryptHashingProvider();

  it("should hash a plan text password", async () => {
    const plainPassword = "password123";

    const hashedPassword = await hashingProvider.hash(plainPassword);

    expect(hashedPassword).not.toBe(plainPassword);
    expect(hashedPassword).toBeTruthy();
  });

  it("should compare a plan text password with a hashed password", async () => {
    const plainPassword = "password123";
    const hashedPassword = await hashingProvider.hash(plainPassword);

    const isMatch = await hashingProvider.compare(plainPassword, hashedPassword);

    expect(isMatch).toBe(true);
  });

  it("should return false when comparing a plan text password with a hashed password", async () => {
    const plainPassword = "password123";
    const wrongPassword = "password456";
    const hashedPassword = await hashingProvider.hash(wrongPassword);

    const isMatch = await hashingProvider.compare(plainPassword, hashedPassword);

    expect(isMatch).toBe(false);
  });
});
