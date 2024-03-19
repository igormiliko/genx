import {deflate, inflate} from "zlib"

export function compressString(str: string) {
    return new Promise<string>((resolve, reject) => {
        deflate(str, (err: any, buffer: Buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}

// Descomprimir uma string usando zlib
export function decompressString(compressedStr: string) {
    const buffer = Buffer.from(compressedStr, 'base64');
    return new Promise<string>((resolve, reject) => {
        inflate(buffer, (err, uncompressedBuffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(uncompressedBuffer.toString());
            }
        });
    });
}
