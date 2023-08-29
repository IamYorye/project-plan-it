import { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./Account/SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Account/LoginForm";
import ProjectForm from "./Project/ProjectForm";
import ProjectList from "./Project/ProjectList";

function App() {
	return (
		<div>
			<BrowserRouter>
				<AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
					<Routes>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
<<<<<<< HEAD
						<Route path='/projects/new' element={<ProjectForm />}></Route>
						<Route path='/projects' element={<ProjectList />}></Route>
=======
						<Route path="/projects/new" element={<ProjectForm />}></Route>
						<Route path="/projects" element={<ProjectList />}></Route>
>>>>>>> 4b8ad712fd84e10e9a35b7677fec4e5ceedfbccc
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
