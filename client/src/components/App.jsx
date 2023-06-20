import {
  Header,
  Footer,
  Tour,
  Home,
  Account,
  ErrorPage,
  LoginPage,
  SignupPage,
  TourCards,
  CreateTourPage,
} from "./";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "../contexts/userAuth";
import TourProvider from "../contexts/TourContext";
import ErrProvider from "../contexts/ErrContext";

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
            <Route
              path="/alltours"
              element={
                <TourProvider>
                  <TourCards />
                </TourProvider>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/me" element={<Account />} />
            <Route
              path="/tour"
              element={
                <TourProvider>
                  <Tour />
                </TourProvider>
              }
            />
            <Route path="/createtour" element={<CreateTourPage />} />
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

// base_url = https://tourme.onrender.com
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
