import React, { useEffect, useState } from 'react'
import { MdMenu, MdOutlineCancel } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { ShowOnLogin } from '../../components/protect/hiddenLinks'
import { selectUser } from '../../redux/slices/authSlice'
import Logout from '../authLayout/Logout'

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [suspendAccount, setSuspendedAccount] = useState(false)
	const user = useSelector(selectUser)

	useEffect(() => {
		if (user?.accountStatus === 'Suspended') {
			setSuspendedAccount(true)
			//toast.error("Account has being suspended, send an email to appeal@belocated.ng to appeal")
			return
		}
	}, [])

	const handleCloseMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<header className='w-full border-b border-gray-200'>
			<div className='ml-5 py-6 px-2 flex justify-between items-center mx-auto md:px-2'>
				<div className='cursor-pointer text-secondary'>
					{/* <span className='text-tertiary'>Be</span>located */}
					<div className='flex flex-col justify-start md:hidden'>
						<div className='flex items-center gap-1'>
							<h1 className='text-lg text-gray-600 font-bold'>Welcome, </h1>
							<h4 className='text-lg text-gray-600 font-medium'>
								{user?.fullname ? user?.fullname : user?.username}
							</h4>
						</div>
						<p className='text-gray-500 font-light text-sm'>
							@{user?.username}
						</p>
					</div>
				</div>

				<div className='hidden nav__items z-10 mr-5 gap-4 font-medium text-lg text-gray-600 md:flex'>
					<NavLink to={`/dashboard/${user?.username}`}>Home</NavLink>
					{suspendAccount ? '' : <NavLink to='/dashboard/earn'>Earn</NavLink>}
					<NavLink to='/dashboard/advertise'>Advertise</NavLink>
					<NavLink to='/terms'>Terms</NavLink>
					<NavLink to='/contact'>Contact</NavLink>
					<div className='flex items-center  bg-tertiary text-gray-100 text-[15px] px-4 py-1 rounded-full cursor-pointer hover:bg-secondary'>
						<Logout />
					</div>
				</div>

				<div className='relative md:hidden'>
					<div>
						{mobileMenuOpen && (
							<MdOutlineCancel
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								size={30}
								className='text-gray-600'
							/>
						)}
						{!mobileMenuOpen && (
							<MdMenu
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								size={30}
								className='text-gray-600'
							/>
						)}
					</div>
				</div>

				{mobileMenuOpen && (
					<div className='absolute z-10 w-full right-0 left-0 shadow-xl top-[6rem] py-[5rem] p-[1.5rem] bg-primary rounded-sm'>
						{/* Mobile Dropdown Menu for ordinary Users */}
						<>
							{user?.accountType === 'User' && (
								<div
									onClick={() => handleCloseMenu()}
									className='flex flex-col h-[200px] justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
									<Link to='/'>Home</Link>
									{suspendAccount ? '' : <Link to='/dashboard/earn'>Earn</Link>}
									<Link to='/dashboard/advertise'>Advertise</Link>
									<Link to='/terms'>Terms</Link>
									<ShowOnLogin>
										<Link to={'/dashboard/update-profile'}>Settings</Link>
										<Link
											to={`/dashboard/${user?.username}`}
											className='text-gray-800 cursor-pointer'>
											Dashboard
										</Link>
									</ShowOnLogin>
									<ShowOnLogin>
										<Logout />
									</ShowOnLogin>
								</div>
							)}
						</>

						{/* Mobile Dropdown Menu for Admins */}
						<>
							{user?.accountType === 'Admin' && (
								<div
									onClick={() => handleCloseMenu()}
									className='flex flex-col h-[200px] justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
									<Link to='/'>Home</Link>
									<Link to='/terms'>Terms</Link>
									<ShowOnLogin>
										<Link
											to={`/admin/dashboard/transactions/${user?.username}`}>
											Transactions
										</Link>
										<Link to={`/admin/dashboard/withdrawals/${user?.username}`}>
											Withdrawals
										</Link>
										<Link to={'/dashboard/update-profile'}>Settings</Link>
										<Link to={`/dashboard/ref-cha/${user?.username}`}>
											Refferal Challenge
										</Link>
										<Link
											to={`/dashboard/${user?.username}`}
											className='text-gray-800 cursor-pointer'>
											User Dashboard
										</Link>
									</ShowOnLogin>
									<ShowOnLogin>
										<Logout />
									</ShowOnLogin>
								</div>
							)}
						</>
					</div>
				)}
			</div>
		</header>

		//     <header className='w-full border-b border-gray-200'>
		//    <div className='mx-auto px-2 md:px-2'>
		//       <div className='py-6 flex justify-between items-center'>

		//          {/* Left section with logo and user information */}
		//          <div className='cursor-pointer text-secondary'>
		//             <div className='flex flex-col justify-start md:hidden'>
		//                <div className='flex items-center gap-1'>
		//                   <h1 className='text-lg text-gray-600 font-bold'>Welcome, </h1>
		//                   <h4 className='text-lg text-gray-600 font-medium'>{user?.fullname ? user?.fullname : user?.username}</h4>
		//                </div>
		//                <p className='text-gray-500 font-light text-sm'>@{user?.username}</p>
		//             </div>

		//             <form className='hidden md:flex'>
		//                <input type="text" placeholder="Search Tasks" className='w-[300px] px-5 py-2 border border-gray-200 rounded-2xl text-lg'/>
		//             </form>
		//          </div>

		//          {/* Center section with navigation links */}
		//          <div className='hidden nav__items gap-4 font-medium text-lg text-gray-600 md:flex'>
		//             <NavLink to={`/dashboard/${user?.username}`}>Home</NavLink>
		//             <NavLink to='/dashboard/earn'>Earn</NavLink>
		//             <NavLink to='/dashboard/advertise'>Advertise</NavLink>
		//             <NavLink to='/terms'>Terms</NavLink>
		//             <NavLink to='/contact'>Contact</NavLink>
		//             <div className='flex items-center bg-tertiary text-gray-100 text-[15px] px-4 py-1 rounded-full cursor-pointer hover:bg-secondary'>
		//                <Logout />
		//             </div>
		//          </div>

		//          {/* Right section with mobile menu toggle */}
		//          <div className='relative md:hidden'>
		//             <div>
		//                {mobileMenuOpen && <MdOutlineCancel onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
		//                {!mobileMenuOpen && <MdMenu onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
		//             </div>
		//          </div>

		//          {/* Mobile menu */}
		//          {mobileMenuOpen && (
		//             <div className='absolute w-full right-0 left-0 shadow-xl top-[6rem] py-[5rem] p-[1.5rem] bg-primary rounded-sm'>
		//                <div onClick={() => handleCloseMenu()} className='flex flex-col h-[200px] justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
		//                   {/* Mobile navigation links */}
		//                   <Link to="/">Home</Link>
		//                   <Link to="/dashboard/earn">Earn</Link>
		//                   <Link to="/dashboard/advertise">Advertise</Link>
		//                   <Link to='/terms'>Terms</Link>
		//                   <ShowOnLogin>
		//                      <Link to={`dashboard/account-settings/${user?.username}`}>Settings</Link>
		//                      <Link to={`/dashboard/${user?.username}`} className='text-gray-800 cursor-pointer'>Dashboard</Link>
		//                   </ShowOnLogin>
		//                   <ShowOnLogin>
		//                      <Logout />
		//                   </ShowOnLogin>
		//                </div>
		//             </div>
		//          )}
		//       </div>
		//    </div>
		// </header>
	)
}

export default Header
