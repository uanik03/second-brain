import {JWTUser} from "../../utils/index"

export {}

declare global {
  namespace Express {
    export interface Request {
      User?: JWTUser;
    }
  }
}