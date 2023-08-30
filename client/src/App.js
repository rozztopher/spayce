import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BG from "./components/BG";
import Footer from "./components/footer/Footer";
import UserContext from "./contexts/UserContext";
import SmartContractContext from "./contexts/SmartContractContext";
import Social from "./components/Social";
import MinimisedFooter from "./components/footer/MinimisedFooter";
import AppContainer from "./AppContainer";

function App() {
  return (
    <UserContext>
      <SmartContractContext>
        <Router>
          <div className="app" id="app">
            <BG />
            <Nav />
            <AppContainer />
          </div>
          {window.innerWidth >= 1300 && <Social />}
          <Footer />
          <MinimisedFooter />
        </Router>
      </SmartContractContext>
    </UserContext>
  );
}

export default App;
