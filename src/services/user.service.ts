import prisma from "../prisma";
import type { User } from "../generated/client";

/**
 * Ambil semua user (yang belum dihapus / soft delete)
 */
export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });
};

/**
 * Ambil user berdasarkan ID
 */
export const getUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Tambah user baru
 */
export const createUser = async (data: {
  name: string;
  email: string;
}): Promise<User> => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
};

/**
 * Update user
 */
export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
  }
): Promise<User> => {
  await getUserById(id); // cek existence

  return await prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Soft delete user (isi deletedAt)
 */
export const deleteUser = async (id: string): Promise<User> => {
  await getUserById(id); // cek existence

  return await prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

/**
 * Cari user berdasarkan nama / email
 */
export const searchUsers = async (
  name?: string,
  email?: string
): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      deletedAt: null,
      AND: [
        name
          ? {
              name: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {},
        email
          ? {
              email: {
                contains: email,
                mode: "insensitive",
              },
            }
          : {},
      ],
    },
  });
};
