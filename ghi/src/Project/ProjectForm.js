import { useState, useEffect } from "react";

function ProjectForm(){

    const [project_name, setProjectName] = useState('')
    const [project_picture, setProjectPicture] = useState('')
    const [goal, setGoal] = useState('')
    const [is_completed, setIsCompleted] = useState(false)
    const [tech_stack, setTechStack] = useState([])
    const [owner_id, setOwnerId] = useState([])

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
        const value = event.target.value
        setIsCompleted(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.project_name = project_name
        data.project_picture = project_picture
        data.goal = goal
        data.is_completed = is_completed

        const projectUrl = "http://localhost:8000/api/projects"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(projectUrl, fetchConfig)
        if (response.ok) {
            const data = await response.json()
            setOwnerId(data.owner_id)
        }

    }

    const handleTechStack = async (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        fetchData()
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
                    </form>
                </div>
            </div>
        </div>
    )

}
