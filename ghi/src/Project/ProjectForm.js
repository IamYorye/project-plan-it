import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import jwtDecode from "jwt-decode";

function ProjectForm(){

    const {token} = useAuthContext();
    const [project_name, setProjectName] = useState('')
    const [project_picture, setProjectPicture] = useState('')
    const [goal, setGoal] = useState('')
    const [selectedTechStacks, setSelectedTechStacks] = useState([]);
    const [tech_stacks, setTechStacks] = useState([])
    const navigate = useNavigate()

    const decodedToken = jwtDecode(token)

    const owner_id = decodedToken.account.id

    const techStackIds = tech_stacks.map(tech_stack => tech_stack.id);
    console.log(techStackIds)


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

    const handleSubmit = async (event) => {
        event.preventDefault()

        const projectData = {}
        projectData.project_name = project_name
        projectData.project_picture = project_picture
        projectData.goal = goal
        projectData.owner_id = owner_id

        const projectUrl = `${process.env.REACT_APP_API_HOST}/api/projects`
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(projectData),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        const projectResponse = await fetch(projectUrl, fetchConfig)
        if (projectResponse.ok) {
            const newProject = await projectResponse.json()
            console.log(newProject)

            setProjectName('')
            setProjectPicture('')
            setGoal('')
        }
        event.target.reset()
        navigate("/projects")
    }

    const fetchTechStackData = async () => {
        const techStacksUrl = `${process.env.REACT_APP_API_HOST}/api/tech-stacks/`
        const fetchConfig = {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        }

        try {
            const response = await fetch(techStacksUrl, fetchConfig)
            if(response.ok){
                const techStacksData = await response.json()
                setTechStacks(techStacksData)
            }
        } catch (error){
            console.error("Error fetching tech stacks:", error)
        }
    }

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
                    <Select
                        isMulti
                        name="tech_stacks"
                        options={tech_stacks.map(tech_stack => ({
                            value: tech_stack.name,
                            label: tech_stack.name
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
