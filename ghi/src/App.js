import { useEffect, useState } from "react";
import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import Nav from "./nav";
import Dashboard from "./Dashboard";

function App() {
	const { token } = useAuthContext();

	const [projects, setProjects] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [techStacks, setTechStacks] = useState([]);
	const [userStacks, setUserStacks] = useState([]);
	const [projectStacks, setProjectStacks] = useState([]);
	const [attendees, setAttendees] = useState([]);

	async function getProjects() {
		const url = `${process.env.REACT_APP_API_HOST}/api/projects/`;
		const fetchConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const data = await response.json();
			setProjects(data.projects);
		} else {
			console.error("An error occurred fetching the projects");
		}
	}

	async function getAccounts() {
		const url = `${process.env.REACT_APP_API_HOST}/api/accounts/`;
		const fetchConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const data = await response.json();
			setAccounts(data.accounts);
		} else {
			console.error("An error has occurred fetching the accounts");
		}
	}

	async function getTechStacks() {
		const url = `${process.env.REACT_APP_API_HOST}/api/tech-stacks/`;
		const fetchConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const data = await response.json();
			setTechStacks(data.techStacks);
		} else {
			console.error("An error has occurred fetching the tech stacks");
		}
	}

	async function getUserStacks() {
		const url = `${process.env.REACT_APP_API_HOST}/api/user-stacks/`;
		const fetchConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const data = await response.json();
			setUserStacks(data.userStacks);
		} else {
			console.error("An error has occurred fetching the user stacks");
		}
	}

	async function getProjectStacks() {
		const url = `${process.env.REACT_APP_API_HOST}/api/project-stacks/`;
		const fetchConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const data = await response.json();
			setProjectStacks(data.projectStacks);
		} else {
			console.error("An error has occurred fetching the project stacks");
		}
	}

	async function getAttendees() {
		const url = `${process.env.REACT_APP_API_HOST}/api/attendees/`;
		const fetchConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const data = await response.json();
			setAttendees(data.attendees);
		} else {
			console.error("An error has occurred fetching the attendees");
		}
	}

	useEffect(() => {
		getProjects();
		getAccounts();
		getTechStacks();
		getUserStacks();
		getProjectStacks();
		getAttendees();
	}, [token]);

	return (
		<div>
			<BrowserRouter>
				<AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
					<Nav />
					<Routes>
						<Route path='/' element={<Dashboard projects={projects} />}></Route>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
