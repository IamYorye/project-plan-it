import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-dark bg-success'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/'>
						Project Plan-IT
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
						<ul className='nav nav-pills'>
							<li className='nav-item'>
								<a className='nav-link active' aria-current='page' href='/'>
									Active
								</a>
							</li>
							<li className='nav-item dropdown'>
								<a
									className='nav-link dropdown-toggle'
									data-bs-toggle='dropdown'
									href='/'
									role='button'
									aria-expanded='false'
								>
									Dropdown
								</a>
								<ul className='dropdown-menu'>
									<li>
										<a className='dropdown-item' href='/'>
											Action
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
											Separated link
										</a>
									</li>
								</ul>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='localhost:3000'>
									Link
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Nav;
