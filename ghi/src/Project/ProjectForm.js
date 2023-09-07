import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import jwtDecode from "jwt-decode";

<<<<<<< HEAD
export default function ProjectForm() {
=======
export default function ProjectForm()
{
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
  const { token } = useToken();
  const [project_name, setProjectName] = useState('')
  const [project_picture, setProjectPicture] = useState('')
  const [goal, setGoal] = useState('')
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [tech_stacks, setTechStacks] = useState([])
  const navigate = useNavigate()

  const decodedToken = jwtDecode(token)

  const owner_id = decodedToken.account.id

  console.log(selectedTechStacks)

<<<<<<< HEAD
  const handleProjectNameChange = (event) => {
=======
  const handleProjectNameChange = (event) =>
  {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
    const value = event.target.value
    setProjectName(value)
  }

<<<<<<< HEAD
  const handleProjectPictureChange = (event) => {
=======
  const handleProjectPictureChange = (event) =>
  {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
    const value = event.target.value
    setProjectPicture(value)
  }

<<<<<<< HEAD
  const handleGoalChange = (event) => {
=======
  const handleGoalChange = (event) =>
  {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
    const value = event.target.value
    setGoal(value)
  }

<<<<<<< HEAD
  const handleTechStackChange = (selectedOptions) => {
=======
  const handleTechStackChange = (selectedOptions) =>
  {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
    const selectedTechStackValues = selectedOptions.map(option => option.value);
    setSelectedTechStacks(selectedTechStackValues);
    console.log(selectedTechStackValues)
  };

<<<<<<< HEAD
  const handleSubmit = async (event) => {
=======
  const handleSubmit = async (event) =>
  {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
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

<<<<<<< HEAD
    try {
      const projectResponse = await fetch(projectUrl, fetchConfig);
      if (projectResponse.ok) {
=======
    try
    {
      const projectResponse = await fetch(projectUrl, fetchConfig);
      if (projectResponse.ok)
      {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
        const newProject = await projectResponse.json();
        console.log(newProject);

        setProjectName("");
        setProjectPicture("");
        setGoal("");

        const projectStacksUrl = `${process.env.REACT_APP_API_HOST}/api/project-stacks`;
        const projectStacksData = {
          project_id: newProject.id,
          tech_stacks_id: selectedTechStacks,
        };
        const projectStacksFetchConfig = {
          method: "post",
          body: JSON.stringify(projectStacksData),
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const projectStacksResponse = await fetch(projectStacksUrl, projectStacksFetchConfig);
<<<<<<< HEAD
        if (projectStacksResponse.ok) {
          console.log("Tech stacks and project ID saved on the backend.");
        } else {
=======
        if (projectStacksResponse.ok)
        {
          console.log("Tech stacks and project ID saved on the backend.");
        } else
        {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
          console.error("Failed to save tech stacks and project ID.");
        }

        event.target.reset();
        navigate("/projects");
<<<<<<< HEAD
      } else {
        console.error("Failed to create a new project.");
      }
    } catch (error) {
=======
      } else
      {
        console.error("Failed to create a new project.");
      }
    } catch (error)
    {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
      console.error("Error:", error);
    }
  };

<<<<<<< HEAD
  const fetchTechStackData = async () => {
=======
  const fetchTechStackData = async () =>
  {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
    const techStacksUrl = `${process.env.REACT_APP_API_HOST}/api/tech-stacks/`
    const fetchConfig = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

<<<<<<< HEAD
    try {
      const response = await fetch(techStacksUrl, fetchConfig)
      if (response.ok) {
=======
    try
    {
      const response = await fetch(techStacksUrl, fetchConfig)
      if (response.ok)
      {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
        const techStacksData = await response.json()
        setTechStacks(techStacksData)

        console.log("Tech Stacks:", techStacksData.map(tech_stack => tech_stack.name));
      }
<<<<<<< HEAD
    } catch (error) {
=======
    } catch (error)
    {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
      console.error("Error fetching tech stacks:", error)
    }
  }

<<<<<<< HEAD
  useEffect(() => {
    if (token) {
=======
  useEffect(() =>
  {
    if (token)
    {
>>>>>>> 59e6449b4c46d889fc1c8aed79b41ba6bcd7462d
      fetchTechStackData()
    }
  }, [token]);
  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Project
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="project_name" className="block text-sm font-medium leading-6 text-gray-900">
                Project Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleProjectNameChange}
                  value={project_name}
                  id="project_name"
                  name="project_name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="project_picture" className="block text-sm font-medium leading-6 text-gray-900">
                  Project Display (URL)
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleProjectPictureChange}
                  value={project_picture}
                  id="project_picture"
                  name="project_picture"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                  Project Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleGoalChange}
                  value={goal}
                  id="goal"
                  name="goal"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="project_picture" className="block text-sm font-medium leading-6 text-gray-900">
                  Tech Stacks
                </label>
              </div>
              <div className="mt-2">
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
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
