import Checkbox from "../../../components/inputs/Checkbox";

const FilterMenu = (props) => {
  const categories = [
    "Furniture",
    "Building Block",
    "Monster",
    "Vehicle",
    "Animal",
  ];
  const types = ["3D"];
  const collections = ["Alpha Collection"];

  const handleCategoryChange = (category) => {
    const newFilters = Object.assign([], props.categoryFilters);
    const index = newFilters.indexOf(category);
    index > -1 ? newFilters.splice(index, 1) : newFilters.push(category);
    props.setCategoryFilters(newFilters);
  };

  const handleCollectionChange = (collection) => {
    const newFilters = Object.assign([], props.collectionFilters);
    const index = newFilters.indexOf(collection);
    index > -1 ? newFilters.splice(index, 1) : newFilters.push(collection);
    props.setCollectionFilters(newFilters);
  };

  const handleTypeChange = (type) => {
    const newFilters = Object.assign([], props.typeFilters);
    const index = newFilters.indexOf(type);
    index > -1 ? newFilters.splice(index, 1) : newFilters.push(type);
    props.setTypeFilters(newFilters);
  };

  return (
    <div className="product-filter-container">
      <div className="filter-menu-header">
        <img src="/icons/filter.svg" alt="filter" />
        <p className="medium fs-15">Filter + Sort</p>
        <img
          className="pointer"
          src="/icons/chevron-up-white.svg"
          alt="chevron"
          onClick={() => props.setFilterMenuOpen(false)}
        />
      </div>
      <div className="horizontal-divider mt-16" />
      <p className="maximum-blue-purple uppercase semi-bold fs-14 mt-16">
        Category
      </p>
      <Checkbox />
      {categories.map((cat) => {
        return (
          <div className="filter-dropdown-section mt-8" key={cat}>
            <input
              type="checkbox"
              onClick={() => handleCategoryChange(cat)}
            ></input>
            <p className="ml-12 fs-15">{cat}</p>
          </div>
        );
      })}
      <div className="horizontal-divider mt-20" />
      <p className="maximum-blue-purple uppercase semi-bold fs-14 mt-20">
        Collection
      </p>
      {collections.map((collection) => {
        return (
          <div className="filter-dropdown-section mt-8" key={collection}>
            <input
              type="checkbox"
              onClick={() => handleCollectionChange(collection)}
            ></input>
            <p className="ml-12 fs-15">{collection}</p>
          </div>
        );
      })}
      <div className="horizontal-divider mt-20" />
      <p className="maximum-blue-purple uppercase semi-bold fs-14 mt-20">
        Type
      </p>
      {types.map((type) => {
        return (
          <div className="filter-dropdown-section mt-8" key={type}>
            <input
              type="checkbox"
              onClick={() => handleTypeChange(type)}
            ></input>
            <p className="ml-12 fs-15">{type}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FilterMenu;
