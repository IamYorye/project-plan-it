import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ProjectList() {

    const { token } = useAuthContext();
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
            if(response.ok) {
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
        fetchProjectData();
        fetchAccountData();
    }, []);

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

        <div style={{ marginTop: '20px' }}>
            <div className="container">
                <div className="row">
                    {projects && projects.map(project => (
                        <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={project.project_picture} className="card-img-top" alt="project_picture" />
                                <div className="card-body">
                                    <h5 className="card-title">{project.project_name}</h5>
                                    <p className="card-text">{project.goal}</p>
                                    <Link to={`/project-details/${project.id}`} className="btn btn-primary">Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

}

export default ProjectList;
