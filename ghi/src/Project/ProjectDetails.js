import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function ProjectDetails(){


    const {token} = useAuthContext()
    const {project_id, account_id} = useParams()
    const [project, setProject] = useState([])
    const [account, setAccount] = useState([])

    const fetchProjectDetails = async () => {
        const projectUrl = `http://localhost:8000/api/projects/${project_id}`
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const response = await fetch(projectUrl, fetchConfig)
            if (response.ok) {
                const data = await response.json()
                setProject(data)
            }
        } catch (error) {
            console.error("Error fetching project details:", error)
        }
    }

    const fetchAccountDetails = async () => {
        const accountUrl = `${process.env.REACT_APP_API_HOST}/api/accounts/${account_id}`
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
                console.log(data)
            }
        } catch (error) {
            console.error("Error fetching account details:", error)
        }
    }

    const handleJoinProject = async () => {
        const joinUrl = `http://localhost:8000/api/attendees`
        const data = {
            project_id: project_id,
            account_id: account_id
        }

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(joinUrl, fetchConfig)
            if (response.ok){
                alert("You have successfully joined the project!")
            } else {
                alert("Error joining the project.  Please try again later.")
            }
        } catch (error){
            console.error("Error joining the project:", error)
            alert("An error occurred while attempting to join the project.")
        }
    }

    useEffect(() => {
        fetchProjectDetails();
        fetchAccountDetails();
    }, []);

    if(!project) {
        return <div>Loading...</div>
    }

    return (
        <div className="row">
            <div className="col-lg 6">
                <img src={project.project_picture} alt="project_picture" />
            </div>
            <div className="col-lg 6">
                <h2>{project.project_name}</h2>
                <p>{project.goal}</p>
                <div className="form-floating mb-3 text-center">
                <button
                    onClick={handleJoinProject}
                    className="btn btn-primary"
                    style={{ backgroundColor: 'green', marginRight: '10px' }}
                    > Join Project
                </button>
            </div>
            </div>
        </div>
    )

}

export default ProjectDetails
