import { useState } from 'react'
import LoginImg from '../assets/checking-boxes.svg'
import Logo from '../assets/logo.svg'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const apiURL = process.env.REACT_APP_API_URL
        const endpointLogin = apiURL + 'auth/login'

        try {
            const response = await fetch(endpointLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('token', data.token)
                window.location.href = '/infriendtory-dashboard/dashboard'
            } else {
                const errorData = await response.json()
                console.error('Login failed:', errorData.message || 'Unknown error')
                setError('Login failed, please try again.')
            }
        } catch (error) {
            console.error('Network error:', error)
            setError('Network error, please try again later.')
        }

        setUsername('')
        setPassword('')
    }

    return (
        <>
            <div className="w-full max-w-screen-2xl h-[100vh] mx-auto flex flex-col lg:grid lg:grid-cols-2">
                <div className="w-full h-[50vh] lg:h-full py-10 lg:py-0 flex items-center justify-center lg:justify-end">
                    <img src={LoginImg} alt="infriendtory" className="w-full md:w-1/2 lg:w-3/4" />
                </div>
                <div className="w-full h-full lg:w-full flex items-center justify-center bg-white">
                    <div className="w-[90%] md:w-[360px] p-8 md:p-12 flex flex-col items-center gap-4 lg:gap-8 rounded-2xl shadow-[0px_0px_12px_4px] shadow-gray-200">
                        <div className="flex items-end gap-4">
                            <img src={Logo} alt="infriendtory" className="w-[48px] md:w-[80px]" />
                            <h1 className="text-2xl md:text-4xl font-bold">LOGIN</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col">
                            <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="infriendtory-admin" required className="w-full mt-2 px-4 py-2 rounded bg-gray-100 text-sm" />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="infriendtory-password" required className="w-full mt-4 mb-6 px-4 py-2 rounded bg-gray-100 text-sm" />
                            <input type="submit" value="Login" className="w-full px-4 py-2.5 rounded bg-yellowgreen text-white text-sm font-semibold cursor-pointer hover:bg-yellowgreen/[.8]" />
                            {
                                error && (
                                    <p className="mt-4 text-red-500 text-sm">{error}</p>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login