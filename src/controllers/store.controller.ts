import type { Request, Response } from 'express';
import * as storeService from '../services/store.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';

export const getAllStores = asyncHandler(async (_req: Request, res: Response) => {
  const stores = await storeService.getAllStores();
  return successResponse(res, 'Daftar toko', stores);
});

export const getStoreById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const store = await storeService.getStoreById(id);
  return successResponse(res, 'Toko ditemukan', store);
});

export const createStore = asyncHandler(async (req: Request, res: Response) => {
  const store = await storeService.createStore(req.body);
  return successResponse(res, 'Toko berhasil ditambahkan', store, null, 201);
});

export const updateStore = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const store = await storeService.updateStore(id, req.body);
  return successResponse(res, 'Toko berhasil diupdate', store);
});

export const deleteStore = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const store = await storeService.deleteStore(id);
  return successResponse(res, 'Toko berhasil dihapus', store);
});

export const searchStores = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.query;
  const stores = await storeService.searchStores(
    name as string,
  );
  return successResponse(res, 'Hasil pencarian', stores);
});
