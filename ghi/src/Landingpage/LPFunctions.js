import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import React, { useState, useEffect } from "react";

function Card({ project }) {
  return (
    <div className="card bg-white w-[300px] h-[450px] m-2 rounded-lg shadow-lg flex-col">
      <div className="top flex-shrink-0">
        <img
          className="w-[300px] h-[250px] object-fill  p-2"
          src={
            project?.project_picture ||
            "https://live.staticflickr.com/65535/53156011725_dd6c54efab_w.jpg"
          }
          alt={project?.project_name || "Project Name Cannot Be Found"}
        />
      </div>
      <div className="bottom flex flex-col justify-center p-2 space-y-2 overflow-hidden">
        <div className="title font-semibold">
          {project?.project_name || "Default Name"}
        </div>
        <div className="category text-sm font-light m-1 overflow-hidden">
          {project?.goal || "No Project Goal Found"}
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  project: {
    project_picture:
      "https://live.staticflickr.com/65535/53156011725_dd6c54efab_w.jpg",
    project_name: "Project Name Cannot Be Found",
    goal: "No Project Goal Found",
  },
};

function Carousel({ projects }) {
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 325;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 325;
  };

  return (
    <div className="relative">
      <div className="text-center py-4  text-xl font-bold">
        Here's Some Projects Currently Being Worked On! Sign Up Now To Join The
        Effort Of Bringing New Applications To Life!
      </div>
      <div
        id="content"
        className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {projects.map((project) => (
          <div key={project.id}>
            <Card project={project} />
          </div>
        ))}
      </div>
      <div className="static">
        <button onClick={scrollLeft} className="mx-3 m-2 bg-white">
          <FiChevronLeft size={40} />
        </button>
        <button onClick={scrollRight} className="mx-3 m-2 bg-white">
          <FiChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}

function Projectcards() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectsUrl = "http://localhost:8000/api/projects";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(projectsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Project information could not be populated");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <Carousel projects={projects} />;
}

export default Projectcards;
export { Card, Carousel };
