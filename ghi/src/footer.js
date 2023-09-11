import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from 'jwt-decode';
import { Fragment } from 'react'


export default function Footer() {
    const { logout, token } = useToken();
    const location = useLocation();
    const navigate = useNavigate();
    const decodedToken = jwtDecode(token);
    const user = decodedToken.account;

    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
        return null;
    }
    if (token) {
        return (
            <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Privacy Policy</a>
                        </li>
                        <li>
                            <a>Licensing</a>
                        </li>
                        <li>
                            <a>Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>
        );
    }
}


