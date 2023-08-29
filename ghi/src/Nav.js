import { NavLink } from "react-router-dom";
import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Nav() {
	const [username, setUsername] = useState("Guest");
	const { logout } = useToken();

	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/'>
						<img
							src={process.env.PUBLIC_URL + "/project_logo.png"}
							alt='Logo'
							className='navbar-logo'
						/>
					</NavLink>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<div className='navbar-nav mx-auto'>
							<ul className='nav nav-pills fs-5'>
								<li className='nav-item p-3'>
									<a className='nav-link active' aria-current='page' href='/'>
										Home
									</a>
								</li>
								<li className='nav-item dropdown p-3'>
									<a
										className='nav-link dropdown-toggle'
										data-bs-toggle='dropdown'
										href='/'
										role='button'
										aria-expanded='false'
									>
										Projects
									</a>
									<ul className='dropdown-menu'>
										<li>
											<a className='dropdown-item' href='/'>
												List Projects
											</a>
										</li>
										<li>
											<a className='dropdown-item' href='/'>
												Another action
											</a>
										</li>
										<li>
											<a className='dropdown-item' href='/'>
												Something else here
											</a>
										</li>
										<li>
											<hr className='dropdown-divider' />
										</li>
										<li>
											<a className='dropdown-item' href='/'>
												Create A Project
											</a>
										</li>
									</ul>
								</li>
								<li className='nav-item p-3'>
									<a
										className='nav-link d-md-flex justify-content-md-end'
										href='localhost:3000'
									>
										Link
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
					<button className='btn btn-light me-md-2' type='button'>
						<a className='nav-link' aria-current='page' href='/login'>
							Account
						</a>
					</button>
					<button
						className='btn btn-primary me-md-2'
						type='button'
						onClick={logout}
					>
						Logout
					</button>
				</div>
			</nav>
		</>
	);
}

export default Nav;
