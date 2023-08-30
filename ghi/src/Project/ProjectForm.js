import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

function ProjectForm(){

    const {token} = useAuthContext();
    const [project_name, setProjectName] = useState('')
    const [project_picture, setProjectPicture] = useState('')
    const [goal, setGoal] = useState('')
    const [owner_id, setOwnerId] = useState('')
    const [selectedTechStacks, setSelectedTechStacks] = useState([]);
    const [tech_stacks, setTechStacks] = useState([])
    const navigate = useNavigate()


    const handleProjectNameChange = (event) => {
        const value = event.target.value
        setProjectName(value)
    }

    const handleProjectPictureChange = (event) => {
        const value = event.target.value
        setProjectPicture(value)
    }

    const handleGoalChange = (event) => {
        const value = event.target.value
        setGoal(value)
    }

    const handleTechStackChange = (selectedOptions) => {
        const selectedTechStackValues = selectedOptions.map(option => option.value);
        setSelectedTechStacks(selectedTechStackValues);
    };

    const handleOwnerIdChange = (event) => {
        const value = event.target.value
        setOwnerId(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.project_name = project_name
        data.project_picture = project_picture
        data.goal = goal
        data.owner_id = owner_id

        const projectUrl = "http://localhost:8000/api/projects"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(projectUrl, fetchConfig)
        if (response.ok) {
            const newProject = await response.json()
            console.log(newProject)

            setProjectName('')
            setProjectPicture('')
            setGoal('')
            setOwnerId('')
        }
        event.target.reset();
        navigate("/projects")

    }

    const fetchTechStackData = async () => {
    const techStackUrl = "http://localhost:8000/api/tech-stacks/";
    const fetchConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(techStackUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            const tech_stacks = data.map(tech_stack => tech_stack.stacks.join(', '));
            console.log(data);
            setTechStacks(tech_stacks || []);
        }
    } catch (error) {
        console.error("Error fetching tech stacks:", error);
        }
    };


    useEffect(() => {
        fetchTechStackData()
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>New Project</h1>
                    <form onSubmit={handleSubmit} id="new-project-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleProjectNameChange} value={project_name} placeholder="project_name" required type="text" name="project_name" id="project_name" className="form-control" />
                            <label htmlFor="project_name">Project Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleProjectPictureChange} value={project_picture} placeholder="project_picture" required type="text" name="project_picture" id="project_picture" className="form-control" />
                            <label htmlFor="project_picture">Project Picture</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleGoalChange} value={goal} placeholder="goal" required type="text" name="goal" id="goal" className="form-control" />
                            <label htmlFor="goal">Goal</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleOwnerIdChange} value={owner_id} placeholder="owner_id" required type="text" name="owner_id" id="owner_id" className="form-control" />
                            <label htmlFor="owner_id" className="form-check-label">Owner Identification</label>
                        </div>
                        <div className="form-floating mb-3">
                    <Select
                        isMulti
                        name="tech_stacks"
                        options={tech_stacks.map(tech_stack => ({
                            value: tech_stack,
                            label: tech_stack
                        }))}
                        onChange={handleTechStackChange}
                        value={selectedTechStacks.map(value => ({ value, label: value }))}
                    />
                </div>
                <div className="form-floating mb-3 text-center">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: 'green', marginRight: '10px' }}
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
    )

}

export default ProjectForm;
