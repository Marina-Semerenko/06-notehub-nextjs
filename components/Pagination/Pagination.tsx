
import css from './Pagination.module.css'
import ReactPaginate from 'react-paginate';


interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    pageCount,
    currentPage,
    onPageChange,
}: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={pageCount}
            forcePage={currentPage - 1}
            onPageChange={({ selected }) => 
            onPageChange(selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            pageClassName={css.page}
            previousClassName={css.previous}
            nextClassName={css.next}
            breakClassName={css.break}
        />
    );
}