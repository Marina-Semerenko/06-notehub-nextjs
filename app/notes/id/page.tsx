import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetals.client';
import { fetchNoteById } from '@/lib/api';


export default async function NoteDetailsPage({params}: {params: {id: string } }) {
    const { id } = params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient />
    </HydrationBoundary>
);
}