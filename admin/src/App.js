import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Nft from './pages/nft';

function App() {
  return (
    // <UserContext>
    <Router>
      {/* <div className='app' id='app'> */}
        {/* <BG /> */}
        {/* <Nav /> */}
        {/* <div className='app-container'> */}
          <Routes>
            <Route path='/' element={<Nft />} />
            {/* <Route path='/' exact component={Home} />
              <Route path='/community' component={Community} />
              <Route path='/shop' component={Shop} />
              <Route path='/myspayce' component={Spayce} />
              <Route path='/profile' component={Profile} />
              <Route path='/profilesettings' component={ProfileSettings} /> */}
          </Routes>
        {/* </div> */}
      {/* </div> */}
      {/* <Social /> */}
      {/* <Footer /> */}
      {/* <MinimisedFooter /> */}
    </Router>
    // </UserContext>
  );
}

export default App;
