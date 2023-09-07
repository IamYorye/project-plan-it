import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from 'react-router-dom';
import jwtDecode from "jwt-decode";


export default function ProjectDetails() {
    const { token } = useToken()
    const { project_id } = useParams()
    const [project, setProject] = useState([])

    const decodedToken = jwtDecode(token)

    const accountId = decodedToken.account.id
    const accountFirstName = decodedToken.account.first_name
    const accountLastName = decodedToken.account.last_name
    const accountEmail = decodedToken.account.email

    const fetchProjectDetails = async () => {
        const projectUrl = `${process.env.REACT_APP_API_HOST}/api/projects/${project_id}`
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(projectUrl, fetchConfig)
            if (response.ok) {
                const project = await response.json()
                setProject(project)
            }
        } catch (error) {
            console.error("Error fetching project details:", error)
        }
    }

<<<<<<< HEAD
=======
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

            }
        } catch (error) {
            console.error("Error fetching account details:", error)
        }
    }

>>>>>>> 8d52012336ddae7cd835dfaa0bf7c2ded8e5293e
    const handleJoinProject = async () => {
        const joinUrl = `${process.env.REACT_APP_API_HOST}/api/attendees`
        const data = {
            project_id: project_id,
            account_id: accountId
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
            if (response.ok) {
                alert("You have successfully joined the project!")
            } else {
                alert("Error joining the project.  Please try again later.")
            }
        } catch (error) {
            console.error("Error joining the project:", error)
            alert("An error occurred while attempting to join the project.")
        }
    }

    useEffect(() => {
        if (token) {
            fetchProjectDetails();
        }
    }, [token]);

    if (!project) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Project</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Project Display</p>
                    <img src={project.project_picture} alt="project_picture"
                        style={{ width: '350px', height: 'auto' }} />
                </div>
                <div className="mt-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Project Name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{project.project_name}</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Project Description</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{project.goal}</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Project Owner</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{accountFirstName + " " + accountLastName}</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{accountEmail}</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                                onClick={handleJoinProject}
                                className="btn btn-primary"
                                style={{ backgroundColor: 'blue', marginRight: '10px' }}
                            > Join the Team
                            </button>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
