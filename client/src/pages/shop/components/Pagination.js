import React, { useState, useEffect } from "react";

const Pagination = (props) => {
  const [items, setItems] = useState([]);
  const page = props.page
  const limit = props.limit;

  useEffect(() => {
    const newItems = [];
    if (limit <= 5) {
      for (let i = 1; i <= limit; i++) {
        newItems.push(i);
      }
    } else if (limit > 5 && page >= limit - 3) {
      for (let i = limit - 4; i <= limit; i++) {
        newItems.push(i);
      }
    } else {
      const startPoint = page === 1 ? 1 : page - 1;
      const endPoint = page === 1 ? page + 3 : page + 2;
      for (let i = startPoint; i < endPoint; i++) {
        newItems.push(i);
      }
      newItems.push("...");
      newItems.push(limit);
    }
    setItems(newItems);
  }, [props.page, props.limit]);

  const decrement = () => {
    if (page > 1) {
      props.setPage(page - 1);
    }
  };

  const increment = () => {
    if (page < limit) {
      props.setPage(page + 1);
    }
  };

  if (items.length > 0) {
    return (
      <div className="pagination-container mb-40">
        <div
          className="pagination-item pagination-arrow pointer"
          onClick={decrement}
        >
          <img src="/icons/arrow-left-white.svg" alt="left arrow" />
        </div>
        {items.map((item, i) => {
          const numberClass =
            page === item ? "pagination-number" : "maximum-blue-purple";
          return (
            <div
              className={"pagination-item pointer " + numberClass}
              onClick={isNaN(item) ? () => {} : () => props.setPage(item)}
            >
              {item}
            </div>
          );
        })}
        <div
          className="pagination-item pagination-arrow pointer"
          onClick={increment}
        >
          <img src="/icons/arrow-right-white.svg" alt="right arrow" />
        </div>{" "}
      </div>
    );
  } else return <></>;
};

export default Pagination;
