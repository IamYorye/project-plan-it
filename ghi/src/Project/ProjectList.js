import React, { useState, useEffect } from "react";
import { useAuthContext, useToken } from "@galvanize-inc/jwtdown-for-react";

function ProjectCard({ project }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img src={project.project_picture} className="card-img-top" alt={project.project_name} />
                <div className="card-body">
                    <h5 className="card-title">{project.project_name}</h5>
                    <p className="card-text">{project.goal}</p>
                </div>
            </div>
        </div>
    );
}
function ProjectList() {
    const { token } = useAuthContext();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectUrl = "http://localhost:8000/api/projects";
            const fetchConfig = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            try {
                const response = await fetch(projectUrl, fetchConfig);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects); // Assuming the API response has a 'projects' field
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [token]);

    return (
        <div>
            <h2>Project List</h2>
            <div className="row">
                {projects.map((project) => (
                    <div key={project.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={project.project_picture} className="card-img-top" alt="Project" />
                            <div className="card-body">
                                <h5 className="card-title">{project.project_name}</h5>
                                <p className="card-text">{project.goal}</p>
                                <p className="card-text">Completed: {project.is_completed ? 'Yes' : 'No'}</p>
                                <p className="card-text">Owner ID: {project.owner_id}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectList;
