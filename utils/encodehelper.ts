import { 
    shaEncryption
} from "../dependences.ts";

export const shaEncrypt = (text: string) => 
    new shaEncryption().update(text).hex()