
import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    private static instance: PrismaSingleton;
    private prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance(): PrismaSingleton {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaSingleton();
        }
        return PrismaSingleton.instance;
    }

    public getClient(): PrismaClient {
        return this.prisma;
    }
}

export default PrismaSingleton.getInstance();