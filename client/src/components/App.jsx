import { Header, Footer, Tour, Login, Home, Account, ErrorPage } from './';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
import AuthProvider from '../contexts/userAuth';
import TourProvider from '../contexts/TourContext';
import ErrProvider, { useErr } from '../contexts/ErrContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <TourProvider>
                  <Home />
                </TourProvider>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/me" element={<Account />} />
            <Route
              path="/tour"
              element={
                <TourProvider>
                  <Tour />
                </TourProvider>
              }
            />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </ErrProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

//

//

//

//

// <Header showLogin={showLogin} setShowLogin={setShowLogin} />
//           {/* {showLogin && (
//             <Login showLogin={showLogin} setShowLogin={setShowLogin} />
//           )} */}
//           <Route path="/login" element={<Login />} />
//           <main className="main">
//             <div className="card-container">
//               <TourOverviewPage
//                 setTourDetails={setTourDetails}
//                 setShowDetails={setShowDetails}
//               />
//             </div>
//           </main>
//           {showDetails && <Tour tourDetails={tourDetails} />}
//           <Footer />
