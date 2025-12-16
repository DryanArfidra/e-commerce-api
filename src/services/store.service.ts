import prisma from "../prisma";
import type { Store } from "../generated/client";

export const getAllStores = async (): Promise<Store[]> => {
    return await prisma.store.findMany();
};

export const getStoreById = async (id: string): Promise<Store> => {
    const store = await prisma.store.findUnique({
        where: { id },
    });

    if (!store) {
        throw new Error('Store not found');
    }

    return store;
};

export const createStore = async (data: { name: string }): Promise<Store> => {
    return await prisma.store.create({
        data: {
            name: data.name,
        },
    });
};

export const updateStore = async (id: string, data: Partial<Store>): Promise<Store> => {
    await getStoreById(id); // Cek existence

    return await prisma.store.update({
        where: { id },
        data,
    });
};

export const deleteStore = async (id: string): Promise<Store> => {
    await getStoreById(id); // Cek existence

    return await prisma.store.delete({
        where: { id },
    });
};

export const searchStores = async (name?: string): Promise<Store[]> => {
    let result = await getAllStores();
    if (name) {
        result = result.filter(s =>
            s.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    return result;
};
