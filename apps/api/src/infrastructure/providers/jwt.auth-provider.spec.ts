import { JwtAuthProvider } from "./jwt.auth-provider.js";
import Jwt from "jsonwebtoken";
import { jest, describe, it, expect } from "@jest/globals";

describe("JwtAuthProvider Unit Test", () => {
  const jwtProvider = new JwtAuthProvider();
  const secretKey = "secret";
  const payload = { userId: "123" };

  it("should sign a token successfully", async () => {
    const token = await jwtProvider.sign(payload, secretKey, {
      expiresIn: "1h",
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");

    const decoded = Jwt.verify(token, secretKey);
    expect(decoded).toMatchObject(payload);
  });

  it("should throw an error if signing fails", async () => {
    jest.spyOn(Jwt, "sign").mockImplementationOnce(() => {
      throw new Error("Signing failed");
    });

    await expect(jwtProvider.sign(payload, secretKey, {})).rejects.toThrow(
      "Signing failed",
    );
  });
});
