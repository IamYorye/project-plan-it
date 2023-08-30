import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./Account/SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Account/LoginForm";
import ProjectForm from "./Project/ProjectForm";
import ProjectList from "./Project/ProjectList";
import Nav from "./nav";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Nav />
				<AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
					<Routes>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
						<Route path='/projects/new' element={<ProjectForm />}></Route>
						<Route path='/projects' element={<ProjectList />}></Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
