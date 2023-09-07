import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'

const statuses = {
    true: 'text-green-700 bg-green-50 ring-green-600/20',
    false: 'text-gray-600 bg-gray-50 ring-gray-500/10',
}

function classNames(...classes)
{
    return classes.filter(Boolean).join(' ')
}

export default function JoinedProjects({ projects, user, attendees })
{

    const joinedProjects = projects.filter(project => project.owner_id === user.id);
    console.log("attendees:", attendees)
    console.log("projects:", projects.attendees)
    console.log("user:", user)
    return (
        <ul className="divide-y divide-gray-100">
            {joinedProjects.map((project) => (
                <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{project.project_name}</p>
                            <p
                                className={classNames(
                                    statuses[project.is_completed],
                                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                )}
                            >
                                {project.is_completed ? 'Complete' : 'In Progress'}
                            </p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                            <p className="whitespace-nowrap">
                                Goal: {project.goal}
                            </p>
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="truncate">Created by {project.owner_id}</p>
                        </div>
                    </div>
                    <div className="flex flex-none items-center gap-x-4">
                        <NavLink to={`/project-details/${project.id}`}
                            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                        >
                            View project<span className="sr-only">, {project.project_name}</span>
                        </NavLink>
                    </div>
                </li>
            ))}
        </ul>
    )
}
