import React from "react";
import Header from "./components/Header";
import ProductRarity from "./components/ProductRarity";
import ProductCategory from "./components/productCategory";
import Statistics from "./components/statistics";
import Products from "./components/Products";
import ProductCategoryPage from "./components/ProductCategoryPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const Shop = () => {
  if (document.getElementById("app-container")) {
    document.getElementById("app-container").style.width = null;
  }

  const ShopMain = () => {
    return (
      <div className="shop-container">
        <Header />
        <Statistics />
        <ProductRarity />
        <ProductCategory />
        <Products />
      </div>
    );
  };

  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ShopMain} />
      <Route path={`${path}/:category`} component={ProductCategoryPage} />
    </Switch>
  );
};

export default Shop;
