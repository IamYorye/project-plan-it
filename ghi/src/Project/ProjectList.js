import { useState, useEffect } from "react";

import React, { useEffect, useState } from 'react';

function ProjectColumn(props) {
    return (
        <div className="col">
            {props.list.map(project => {
                return (
                    <div key={project.id} className="card mb-3 shadow">
                        <img src={project.project_picture} className="card-img-top" alt="Project" />
                        <div className="card-body">
                            <h5 className="card-title">{project.project_name}</h5>
                            <p className="card-text">{project.goal}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const ProjectList = () => {
    const [projectColumns, setProjectColumns] = useState([[], [], []]);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/projects/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const columns = [[], [], []];

                for (let i = 0; i < data.length; i++) {
                    columns[i % 3].push(data[i]);
                }

                setProjectColumns(columns);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Project List</h2>
            <div className="row">
                {projectColumns.map((projectList, index) => (
                    <ProjectColumn key={index} list={projectList} />
                ))}
            </div>
        </div>
    );
}

export default ProjectList;
