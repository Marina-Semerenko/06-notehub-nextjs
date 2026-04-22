import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', { page: 1, search: '' }],
        queryFn: () => fetchNotes(1, ''),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}