import { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LandingPage from "./LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Routes>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/" element={<LandingPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
