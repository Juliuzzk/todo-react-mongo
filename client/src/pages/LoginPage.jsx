/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { signin, isAuthenticated, errors: loginErrors } = useAuth()

    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async data => {
        signin(data)
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-2xl font-bold ">Login</h1>

                {loginErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white my-2" key={i}>
                        {error}
                    </div>
                ))}
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 p-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}

                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 p-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    <button
                        type="submit"
                        className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Login
                    </button>

                    <p className="flex gap-x-2 justify-between">
                        Dont have an account? <Link to="/register"></Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
