const SortMenu = (props) => {
  const sorts = [
    "Newest",
    "Oldest",
    "Most Expensive",
    "Least Expensive",
    "Popular",
  ];

  const handleSortSelect = (sort) => {
    props.setSortMenuOpen(false);
    props.setActiveSort(sort);
  };

  return (
    <div className="shop-sort-menu-container">
      {sorts.map((sort, i) => {
        return (
          <div
            className="flex-edge pointer"
            key={sort + i}
            onClick={() => handleSortSelect(sort)}
          >
            <p>{sort}</p>
            {props.activeSort === sort && (
              <img src="/icons/tick-purple.svg" alt="tick" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SortMenu;
