import axios, {  type AxiosResponse } from "axios"
import type {  Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteRequest {
    title: string;
    content: string;
    tag: NoteTag;
}
 const BASE_URL:string = "https://notehub-public.goit.study/api/";

    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

    const instance = axios.create({ 
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        }    
});



export const fetchNotes = async (page: number, search: string): Promise<FetchNotesResponse> => {
    const response: AxiosResponse<FetchNotesResponse> = await instance.get('/notes', {
       params: {
            page,
            perPage: 12,
            search,
        },
    });
    return response.data;
};


export const createNote = async (note:CreateNoteRequest): Promise<Note> => {
    const response: AxiosResponse<Note> = await instance.post<Note>(`/notes/`, note);
    return response.data;         
 
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response: AxiosResponse<Note> = await instance.delete(`/notes/${id}`

    );
    return response.data;
};
export const fetchNoteById = async (
    id: string
): Promise<Note> => {
        const response: AxiosResponse<Note> = await instance.get(`/notes/${id}`

        );
        return response.data;
};

