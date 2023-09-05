import React, { useState } from 'react';
import JoinedProjects from "./JoinedProjects";
import MyProjects from "./MyProjects";

export default function Dashboard()
{
    const [selectedTab, setSelectedTab] = useState('myProjects');

    const handleTabClick = (tabKey) =>
    {
        setSelectedTab(tabKey);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={selectedTab}
                        onChange={(e) => handleTabClick(e.target.value)}
                    >
                        <option value="myProjects">My Projects</option>
                        <option value="joinedProjects">Joined Projects</option>
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                        <button
                            className={`group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 ${selectedTab === 'myProjects' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} rounded-l-lg`}
                            aria-current={selectedTab === 'myProjects' ? 'page' : undefined}
                            onClick={() => handleTabClick('myProjects')}
                        >
                            <span>My Projects</span>
                            <span
                                aria-hidden="true"
                                className={`${selectedTab === 'myProjects' ? 'bg-indigo-500' : 'bg-transparent'
                                    } absolute inset-x-0 bottom-0 h-0.5`}
                            />
                        </button>
                        <button
                            className={`group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 ${selectedTab === 'joinedProjects' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} rounded-r-lg`}
                            aria-current={selectedTab === 'joinedProjects' ? 'page' : undefined}
                            onClick={() => handleTabClick('joinedProjects')}
                        >
                            <span>Joined Projects</span>
                            <span
                                aria-hidden="true"
                                className={`${selectedTab === 'joinedProjects' ? 'bg-indigo-500' : 'bg-transparent'
                                    } absolute inset-x-0 bottom-0 h-0.5`}
                            />
                        </button>
                    </nav>
                </div>
            </div>
            {selectedTab === 'myProjects' ? <MyProjects /> : <JoinedProjects />}
        </div>
    );
}
