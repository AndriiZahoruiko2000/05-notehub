import axios from "axios";
import { type Note, type NewNote } from "../types/note";

interface GetNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const serverAPI = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function getNotes(userParams: GetNotesParams) {
  const params: GetNotesParams = {
    perPage: 12,
    ...userParams,
  };

  const res = await serverAPI.get<GetNotesResponse>("/notes", { params });
  return res.data;
}

export async function createNote(body: NewNote) {
  const res = await serverAPI.post<Note>("/notes", body);
  return res.data;
}

export async function getNoteById(id: string) {
  const res = await serverAPI.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function deleteNoteById(id: string) {
  const res = await serverAPI.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function updateNoteById(id: string, body: NewNote) {
  const res = await serverAPI.patch<Note>(`/notes/${id}`, body);
  return res.data;
}
