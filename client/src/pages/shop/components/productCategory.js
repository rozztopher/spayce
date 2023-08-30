import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { getAllCategories } from "../../../utils/dbFunctions";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const allCategories = await getAllCategories()
    setCategories(allCategories)
  };

  if (Object.keys(categories).length > 0) {
    return (
      <div className="productCategory-container mt-100">
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className="fs-35">Product Categories</h2>
        </div>
        <div className="productCategory-cta-container mt-30">
            {Object.keys(categories).map(category => {
                const amount = categories[category]
                return (
                    <Link to={`shop/${category}`} key={category}>
                    <div className="productCategory-cta fs-15">
                      <p>
                        {category} <span className="ceil fs-15">({amount})</span>
                      </p>
                      <img
                        className="ml-10"
                        src="/icons/right-arrow.svg"
                        alt="arrow right"
                      ></img>
                    </div>
                  </Link>
                )
            })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ProductCategory;
