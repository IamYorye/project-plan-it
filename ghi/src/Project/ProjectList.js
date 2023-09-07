import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function ProjectList() {

    const { token } = useToken();
    const [project_name, setProjectName] = useState("");
    const [projects, setProjects] = useState([]);
    const [account, setAccount] = useState([])


    const handleProjectNameChange = (event) => {
        const value = event.target.value;
        setProjectName(value);
    };

    const fetchProjectData = async () => {
        const projectsUrl = `${process.env.REACT_APP_API_HOST}/api/projects`;
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(projectsUrl, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchAccountData = async () => {
        const accountUrl = `${process.env.REACT_APP_API_HOST}/api/accounts`
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        try {
            const response = await fetch(accountUrl, fetchConfig)
            if (response.ok) {
                const data = await response.json()
                setAccount(data)

                const decodedToken = jwtDecode(token)
                console.log(decodedToken)
            }
        } catch (error) {
            console.error("Error fetching account details:", error)
        }
    }


    const handleFilterSubmit = (event) => {
        event.preventDefault();
        if (project_name) {
            const filteredProjects = projects.filter(
                (project) => project.project_name === project_name
            );
            setProjects(filteredProjects);
        } else {
            fetchProjectData();
        }
    };

    useEffect(() => {
        if (token) {
            fetchProjectData();
            fetchAccountData();
        }
    }, [token]);

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>Search Projects</h1>
            <form style={{ width: '400px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onSubmit={handleFilterSubmit}>
                <label htmlFor="project_name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Enter Project Name: </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" id="project_name" value={project_name} onChange={handleProjectNameChange} style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Search</button>
                </div>
            </form>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {projects && projects.map((project) => (
                    <li
                        key={project.id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <img src={project.project_picture} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" alt="project_picture" />
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{project.project_name}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Goal</dt>
                                <dd className="text-sm text-gray-500">{project.goal}</dd>
                                <dd className="mt-3">
                                    <Link to={`/project-details/${project.id}`} className="btn btn-primary">Details</Link>
                                </dd>
                            </dl>
                        </div>
                        <div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
