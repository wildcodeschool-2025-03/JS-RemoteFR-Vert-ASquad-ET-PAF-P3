import type { JwtPayload } from "jsonwebtoken";

// to make the file a module and avoid the TypeScript error
export type MyPayload = JwtPayload & { sub: string; role: string };

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      auth: MyPayload;
      /* ************************************************************************* */
    }
  }
}
