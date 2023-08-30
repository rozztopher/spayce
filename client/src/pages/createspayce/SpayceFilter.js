const SpayceFilter = (props) => {
  const options = [
    "Featured",
    "Purchased",
    "Free",
    "Cosmic",
    "Astronomic",
    "Galactic",
    "Void",
    "Collaboration",
  ];
  const active = props.active;
  return (
    <div className="spayce-filter-container mt-40">
      {options.map((option) => {
        const pClass = active === option ? "" : "maximum-blue-purple-75"
        return (
          <div
            className="spayce-filter-item pointer"
            key={option}
            onClick={() => props.setActive(option)}
          >
            <p className={"semi-bold " + pClass}>{option}</p>
            {active === option && (
              <div className="spayce-filter-active mt-12" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpayceFilter;
