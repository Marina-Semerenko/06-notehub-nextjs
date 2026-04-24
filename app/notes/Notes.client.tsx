'use client';


import { keepPreviousData, useQuery } from '@tanstack/react-query'
import css from './NotesPage.module.css'
import { fetchNotes } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import { useState } from 'react'
import SearchBox from '@/components/SearchBox/SearchBox'
import Modal from '@/components/Modal/Modal'
import { useDebouncedCallback } from 'use-debounce'
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() { 

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setsearchQuery] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
 
  const handleSearch = useDebouncedCallback((value: string) => {
    setsearchQuery(value);
    setCurrentPage(1);
  }, 500);


  const { data, isLoading, isError } = useQuery({
      queryKey: ["notes", { currentPage, searchQuery }],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  
  
  return (
    <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    onChange={(value)=> handleSearch(value)}
                />

                {totalPages > 1 && (
                    <Pagination
                        pageCount={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                )}

                <button className={css.button}
                    onClick={() => setModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            { notes.length > 0 && 
                <NoteList notes={notes}
                />
            }

            {modalOpen && (
                <Modal onClose={() =>
                    setModalOpen(false)}>
                    <NoteForm onClose={() =>
                        setModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
}