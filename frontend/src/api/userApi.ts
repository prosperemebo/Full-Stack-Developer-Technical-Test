import { User } from "../types";
import apiClient from "./apiClient";


export const getUsers = async (): Promise<{ data: User[] }> => {
  return await apiClient.get('/user');
};

export const getUser = async (id: string): Promise<{ data: User }> => {
  return await apiClient.get(`/user/${id}`);
};

export const createUser = async (user: User): Promise<{ data: User }> => {
  return await apiClient.post('/user', user);
};

export const updateUser = async (id: string, data: User): Promise<{ data: User }> => {
  return await apiClient.put(`/user/${id}`, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/user/${id}`);
};
