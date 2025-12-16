import type { Request, Response } from 'express';
import * as UserService from '../services/user.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  return successResponse(res, 'Daftar user', users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id!;
  const user = await UserService.getUserById(id);
  return successResponse(res, 'User ditemukan', user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  return successResponse(res, 'User berhasil ditambahkan', user, null, 201);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id!;
  const user = await UserService.updateUser(id, req.body);
  return successResponse(res, 'User berhasil diupdate', user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id!;
  const user = await UserService.deleteUser(id);
  return successResponse(res, 'User berhasil dihapus', user);
});

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.query;
  const users = await UserService.searchUsers(
    name as string,
    email as string
  );
  return successResponse(res, 'Hasil pencarian user', users);
});
