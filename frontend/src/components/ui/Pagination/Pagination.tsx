import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import "./Pagination.less";

type PaginationProps = {
  count: number;
  pageSize: number;
  page: number;
  className?: string;
  setPage: (page: number) => void;
};

const Pagination = ({
  page,
  setPage,
  count,
  pageSize,
  className = "",
}: PaginationProps) => {
  const totalPages = Math.ceil(count / pageSize);

  const onNextPageHandler = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const onPrevPageHandler = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <div className={`pagination ${className}`}>
      <p className="pagination__text">
        Showing <span>{page * pageSize - pageSize + 1}</span> to
        <span> {page * pageSize > count ? count : page * pageSize}</span> of{" "}
        <span>{count}</span> results
      </p>
      <div className="pagination__buttons">
        <button
          className="pagination__buttons__btn pagination__buttons__btn--prev"
          disabled={page === 1}
          onClick={onPrevPageHandler}
        >
          <MdNavigateBefore />
          <span>Prev</span>
        </button>
        <button
          className="pagination__buttons__btn pagination__buttons__btn--next"
          onClick={onNextPageHandler}
          disabled={page === totalPages}
        >
          <span>Next</span>
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
