import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function ProjectList() {

    const { token } = useAuthContext();
    const [project_name, setProjectName] = useState("");
    const [projects, setProjects] = useState([]);

    const handleProjectNameChange = (event) => {
        const value = event.target.value;
        setProjectName(value);
    };

    const fetchProjectData = async () => {
        const projectsUrl = "http://localhost:8000/api/projects";
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
                console.log(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

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
    }, []);

    return (
        <div>
            <h1>Search Projects</h1>
            <form onSubmit={handleFilterSubmit}>
                <label htmlFor="project_name">Enter Project Name: </label>
                <input type="text" id="project_name" value={project_name} onChange={handleProjectNameChange} />
                <button type="submit">Search</button>
                </form>
            <div className="container">
            <div className="row">
                {projects && projects.map(project => (
                    <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card" style={{width: "18rem"}}>
                        <img src={project.project_picture} className="card-img-top" alt="project_picture" />
                        <div className="card-body">
                            <h5 className="card-title">{project.project_name}</h5>
                            <p className="card-text">{project.goal}</p>
                            <a href="/projects" className="btn btn-primary">Details</a>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectList;
