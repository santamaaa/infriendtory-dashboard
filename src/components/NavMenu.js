import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoImg from '../assets/logo.svg'
import LogoTextImg from '../assets/logo-text.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faBox, faBagShopping, faTableList, faLayerGroup, faUserGroup, faRightFromBracket, faEllipsisVertical  } from '@fortawesome/free-solid-svg-icons'

const NavMenu = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [mobileOthersMenu, setMobileOthersMenu] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        navigate('/');
    }

    const pathClass = (path) => {
        return location.pathname === path
            ? 'w-full ps-8 py-4 grid grid-cols-[1fr_4fr] items-center bg-yellowgreen text-white'
            : 'w-full ps-8 py-4 grid grid-cols-[1fr_4fr] items-center hover:bg-gray-100'
    }

    const pathClassForMobile = (path) => {
        return location.pathname === path
            ? 'flex flex-col items-center justify-center gap-1 text-xs font-medium md:text-base text-yellowgreen'
            : 'flex flex-col items-center justify-center gap-1 text-xs font-medium md:text-base'
    }

    const pathClassForMobileOthers = (path) => {
        return location.pathname === path
            ? 'px-4 py-2 md:px-6 md:py-4 flex items-center justify-end gap-4 md:gap-8 text-base font-medium md:text-base text-yellowgreen'
            : 'px-4 py-2 md:px-6 md:py-4 flex items-center justify-end gap-4 md:gap-8 text-base font-medium md:text-base'
    }

    const showMobileOthersMenu = () => {
        setMobileOthersMenu(!mobileOthersMenu)
    }

    const hideMobileOthersMenu = () => {
        setMobileOthersMenu(false)
    }

    const mobileOthersMenuStyle = {
        display: mobileOthersMenu ? 'flex' : 'none'
    }

    return (
        <>
            <nav className="w-full h-[100vh] pe-20 md:pe-0 absolute z-10 md:static hidden lg:flex flex-col justify-between shadow-md shadow-gray-400 bg-white">
                <div className="w-full px-8 py-4 flex flex-col items-center justify-center gap-4">
                    <img src={LogoImg} alt="infriendtory" className="w-[20%] max-w-[40px]" />
                    <img src={LogoTextImg} alt="infriendtory" className="w-full max-w-[200px]" />
                </div>
                <div className="w-full flex flex-col gap-8">
                    <div className="w-full flex flex-col text-black text-base font-medium">
                        <Link to="/dashboard" className={pathClass('/')}>
                            <FontAwesomeIcon icon={faDiamond} className="w-full" />
                            Dashboard
                        </Link>
                        <Link to="/inventory" className={pathClass('/inventory')}>
                            <FontAwesomeIcon icon={faBox} className="w-full" />
                            Inventory
                        </Link>
                        <Link to="/purchase" className={pathClass('/purchase')}>
                            <FontAwesomeIcon icon={faBagShopping} className="w-full" />
                            Purchase
                        </Link>
                    </div>
                    <div className="w-full flex flex-col text-black text-base font-medium">
                        <Link to="/items" className={pathClass('/items')}>
                            <FontAwesomeIcon icon={faTableList} className="w-full" />
                            Items
                        </Link>
                        <Link to="/categories" className={pathClass('/categories')}>
                            <FontAwesomeIcon icon={faLayerGroup} className="w-full" />
                            Categories
                        </Link>
                        <Link to="/suppliers" className={pathClass('/suppliers')}>
                            <FontAwesomeIcon icon={faUserGroup} className="w-full" />
                            Suppliers
                        </Link>
                    </div>
                </div>
                <div className="w-full px-8 py-4">
                    <button onClick={handleLogout} title="Logout" className="w-full py-3.5 grid place-items-center rounded bg-yellowgreen text-white text-xl">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </nav>

            <nav className="w-full absolute bottom-0 z-10 lg:hidden shadow-[0px_-2px_4px_1px] shadow-gray-300 bg-white">
                <div className="w-full px-4 py-3 md:px-12 md:py-6 flex justify-between">
                    <Link to="/dashboard" className={pathClassForMobile('/')}>
                        <FontAwesomeIcon icon={faDiamond} className="w-full text-lg md:text-2xl" />
                        Dashboard
                    </Link>
                    <Link to="/inventory" className={pathClassForMobile('/inventory')}>
                        <FontAwesomeIcon icon={faBox} className="w-full text-lg md:text-2xl" />
                        Inventory
                    </Link>
                    <Link to="/purchase" className={pathClassForMobile('/purchase')}>
                        <FontAwesomeIcon icon={faBagShopping} className="w-full text-lg md:text-2xl" />
                        Purchase
                    </Link>
                    <button onClick={showMobileOthersMenu} className="flex flex-col items-center justify-center gap-1 text-xs font-medium md:text-base">
                        <FontAwesomeIcon icon={faEllipsisVertical} className="w-full text-lg md:text-2xl" />
                        Others
                    </button>
                </div>
                <div style={mobileOthersMenuStyle} className="w-[100vw] h-[calc(100vh-62px)] md:h-[calc(100vh-100px)] absolute bottom-[62px] left-0 md:bottom-[100px]">
                    <div onClick={hideMobileOthersMenu} className="w-full h-full absolute z-0 bg-transparent"></div>
                    <div className="w-1/2 px-4 py-6 md:px-6 md:py-8 absolute bottom-4 right-4 md:bottom-8 md:right-12 flex flex-col gap-4 md:gap-6 shadow-lg shadow-gray-300 rounded bg-white">
                        <Link to="/items" className={pathClassForMobileOthers('/items')}>
                            Items
                            <FontAwesomeIcon icon={faTableList} className="text-lg md:text-2xl" />
                        </Link>
                        <Link to="/categories" className={pathClassForMobileOthers('/categories')}>
                            Categories
                            <FontAwesomeIcon icon={faLayerGroup} className="text-lg md:text-2xl" />
                        </Link>
                        <Link to="/suppliers" className={pathClassForMobileOthers('/suppliers')}>
                            Suppliers
                            <FontAwesomeIcon icon={faUserGroup} className="text-lg md:text-2xl" />
                        </Link>
                        <button onClick={handleLogout} className="px-4 py-2 md:px-6 md:py-4 flex items-center justify-end gap-4 md:gap-8 text-base font-medium bg-yellowgreen text-white rounded md:text-base">
                            Logout
                            <FontAwesomeIcon icon={faRightFromBracket} className="text-lg md:text-2xl" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavMenu