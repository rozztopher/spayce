import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import Shop from "./pages/shop/Shop";
import Spayce from "./pages/spayce/Spayce";
import Profile from "./pages/profile/Profile";
import ProfileSettings from "./pages/profile/ProfileSettings";
import CreateSpayce from "./pages/createspayce/CreateSpayce";
import EditSpayce from "./pages/editspayce/EditSpayce";
import { UserContext } from "./contexts/UserContext";
import { SmartContractContext } from "./contexts/SmartContractContext"

function AppContainer() {
  const { connectMetamask } = useContext(UserContext);
  const { initialiseERC1155Contract } = useContext(SmartContractContext)

  useEffect(() => {
      if (sessionStorage.getItem('jwt')) {
          connectMetamask()
      }
      initialiseERC1155Contract()
  }, [])

  return (
    <div className="app-container" id="app-container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/community" component={Community} />
        <Route path="/shop" component={Shop} />
        <Route path="/myspayce" component={Spayce} />
        <Route path="/edit" component={EditSpayce} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/profilesettings" component={ProfileSettings} />
        <Route path="/create" component={CreateSpayce} />
      </Switch>
    </div>
  );
}

export default AppContainer;
