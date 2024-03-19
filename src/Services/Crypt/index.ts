import { publicEncrypt, BinaryLike, Cipher, CipherCCMOptions, CipherCCMTypes, CipherKey, Decipher, DecipherCCM, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

type TCryptOptions = {
    algorithm: string,
    key: CipherKey,
}

class Crypt {
    private cryptOptions: TCryptOptions = {
        algorithm: 'aes-256-gcm',
        key: Buffer.from([0x4c, 0x8c, 0x45, 0x66, 0xd7, 0x4e, 0x07, 0xde, 0x69, 0xc4, 0xac, 0xee, 0x8c, 0x8e, 0xbf, 0x6c, 0x52, 0x63, 0x6a, 0xff, 0x6d, 0x22, 0x4e, 0x55, 0x05, 0x1b, 0x8f, 0x9e, 0x4a, 0x02, 0x2b, 0x0b]),
    }


    public async decipher(textToDecipher: string, iv: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const { algorithm, key } = this.cryptOptions
                
                const decipher = createCipheriv(algorithm, key, Buffer.from(iv, 'hex'));
                // decipher.

                let str = Buffer.concat([decipher.update(textToDecipher, 'hex'), decipher.final()]).toString();

                return resolve(str)
            } catch (error) {
                return reject(error)
            }
        })
    }

    public async cipher(textToCipher: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const { algorithm, key } = this.cryptOptions

                const iv = randomBytes(12);

                const cipher = createCipheriv(algorithm, key, iv);

                let encrypted = cipher.update(String(textToCipher), 'utf8', 'hex');

                encrypted += cipher.final('hex');

                return resolve(iv.toString('hex') + '.' + encrypted)
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default new Crypt()