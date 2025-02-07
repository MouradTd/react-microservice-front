import React, { useState, useMemo, useEffect } from "react";
import helpers from "../utils/helpers";


type Item = Record<string, any>;

type ActionButton = {
  icon?: string;
  className: string;
  type?: string;
  text?: string;
  onClick: (item: Item) => void;
};

interface TableProps {
  items: Item[];
  headers: { text: string; value: string; isComplex?: boolean; type?: string }[];
  buttonType?: string;
  pageSize: number;
  disabled?: string;
  actionsConfig: ActionButton[];
}

const DataTable: React.FC<TableProps> = ({ items = [], headers, buttonType, pageSize, actionsConfig }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>("model");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort items
  const sortedItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => {
      const modifier = sortOrder === "desc" ? -1 : 1;
      if (a[sortKey] < b[sortKey]) return -1 * modifier;
      if (a[sortKey] > b[sortKey]) return 1 * modifier;
      return 0;
    });
  }, [items, sortKey, sortOrder]);

  // Paginate items
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, currentPage, pageSize]);

  const totalPages = Math.ceil(items.length / pageSize);

  const sortTable = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  // Pagination range logic
  const visiblePageNumbers = useMemo(() => {
    const pages: number[] = [];
    const pageRangeDisplayed = 2;
    let startPage = Math.max(1, currentPage - pageRangeDisplayed);
    let endPage = Math.min(totalPages, currentPage + pageRangeDisplayed);

    if (startPage <= 1) {
      endPage = Math.min(startPage + pageRangeDisplayed * 2, totalPages);
    }
    if (endPage >= totalPages) {
      startPage = Math.max(1, endPage - pageRangeDisplayed * 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);


  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header.value}
                onClick={() => sortTable(header.value)}
                className={`fw-bold ${index === 0 ? "text-start" : "text-center"}`}
                style={{ cursor: "pointer" }}
              >
                {header.text}
                {sortKey === header.value && <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <tr key={item.id}>
                {headers.map((header, index) => (
                  <td key={header.value} className={index === 0 ? "text-start" : "text-center"}>
                    {header.type === "text" && <small>{item[header.value]}</small>}
                    {header.type === "number" && <small>{helpers.formatNumber(item[header.value])}</small>}
                    {header.type === "date" && <small>{helpers.formatDate(item[header.value])}</small>}
                    {header.type === "characteristics" && item[header.value].map((char, idx) => (<span key={idx}>{char}, </span>))}
                  </td>
                ))}
                {buttonType === "simple" && (
                  <td className="text-center">
                    {actionsConfig.map((action) => (
                      <button
                        key={action.icon}
                        className={`btn me-2 btn-sm ${action.className}`}
                        onClick={() => action.onClick(item)}
                      >
                        <i className={action.icon}></i>
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center">
                Aucun enregistrements correspondants trouvés
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); changePage(1); }}>
              <i className="ti ti-chevron-left"></i>
            </a>
          </li>

          {visiblePageNumbers.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); changePage(page); }}>
                {page}
              </a>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); changePage(totalPages); }}>
              <i className="ti ti-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;