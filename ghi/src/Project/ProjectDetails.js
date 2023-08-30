import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

function ProjectDetails() {
    const {token} = useAuthContext();
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        async function fetchProjectDetails() {
            try {
                const response = await fetch(`http://localhost:8000/api/projects/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        }

        fetchProjectDetails();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Project Details</h1>
            <p>Project Name: {project.project_name}</p>
            {/* ... display other project details ... */}
        </div>
    );
}

export default ProjectDetails;
