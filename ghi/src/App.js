import useToken from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./Account/SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Account/LoginForm";
import ProjectForm from "./Project/ProjectForm";
import ProjectList from "./Project/ProjectList";
import ProjectDetails from "./Project/ProjectDetails";
import React from "react";
import LandingPage from "./Landingpage/LandingPage";
import Nav from "./navbar";
import Dashboard from "./Dashboard/Dashboard";


function App()
{
	const { token } = useToken();

	if (token)
	{


		return (
			<div>
				<BrowserRouter>
					{/* <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}> */}
					<Nav />
					<Routes>
						<Route path='/dashboard' element={<Dashboard />}></Route>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
						<Route path="/projects/new" element={<ProjectForm />}></Route>
						<Route path="/projects" element={<ProjectList />}></Route>
						<Route path="/project-details/:project_id/" element={<ProjectDetails />}></Route>
					</Routes>
					{/* </AuthProvider> */}
				</BrowserRouter>
			</div>
		);
	} else
	{
		return (
			<div>
				<BrowserRouter>
					{/* <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}> */}
					<Routes>
						<Route path='/' element={<LandingPage />}></Route>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
					</Routes>
					{/* </AuthProvider> */}
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
