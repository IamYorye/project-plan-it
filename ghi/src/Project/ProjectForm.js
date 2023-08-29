import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function ProjectForm(){

    const {token} = useAuthContext();
    const [project_name, setProjectName] = useState('')
    const [project_picture, setProjectPicture] = useState('')
    const [goal, setGoal] = useState('')
    const [is_completed, setIsCompleted] = useState(false)
    const [owner_id, setOwnerId] = useState('')
    const [tech_stack, setTechStack ] = useState('')
    const [tech_stacks, setTechStacks] = useState([])


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

    const handleIsCompletedChange = (event) => {
        const value = event.target.checked
        setIsCompleted(value)
    }

    const handleTechStackChange = (event) => {
        const value = event.target.value
        setTechStack(value)
    }

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
        data.is_completed = is_completed
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
            setIsCompleted(false)
            setOwnerId('')
        }

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
    }, [])

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
                        <div className="form-check form-switch mb-3">
                            <input onChange={handleIsCompletedChange} value={is_completed} placeholder="is_completed" required type="checkbox" name="is_completed" id="is_completed" className="form-check-input" />
                            <label htmlFor="is_completed" className="form-check-label">Completed ?</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleOwnerIdChange} value={owner_id} placeholder="owner_id" required type="text" name="owner_id" id="owner_id" className="form-control" />
                            <label htmlFor="owner_id" className="form-check-label">Owner Identification</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleTechStackChange} value={tech_stack} required id="tech_stack" name="tech_stack" className="form-select">
                                <option value="">Choose Tech Stacks for this Project</option>
                                {tech_stacks.map((tech_stack, index) => (
                                    <option key={index} value={tech_stack}>
                                        {tech_stack}
                                    </option>
                                ))}
                                </select>
                                <div className="mb-3">
                            <button type="submit" className="btn btn-primary me-3">Create Project</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ProjectForm;
