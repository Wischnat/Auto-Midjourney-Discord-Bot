import { AxiosRequestConfig } from "axios";
import { createHash, randomUUID, Hash } from "crypto";

export abstract class Request<T> {
  protected _url: string;
  protected _payload: T;
  protected _header: AxiosRequestConfig;

  protected calcNonce(): string {
    const length: number = 19;
    const decimalPoint: number = 2;
    return Math.random().toPrecision(length).toString().substring(decimalPoint);
  }

  protected generateSessionId(): string {
    const sessionId: string = randomUUID().replace("-", "");
    const sha2: Hash = createHash("sha256");
    const encryptedSessionId: string = sha2.update(sessionId).digest("hex");

    return encryptedSessionId;
  }
}
