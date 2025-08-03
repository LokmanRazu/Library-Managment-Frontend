import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/authSlice';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error,user } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };
    useEffect(() => {
        if (user && status === 'succeeded') {
            console.log(user,'userrr');
            navigate('/'); // go to home page
        }
    }, [user, status, navigate]);


    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                    <img
                        src="/assets/ScienceBooks/login.png"
                        width="150"
                        className="mx-auto"
                        alt="Logo"
                    />
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                            Log in to your account
                        </h3>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Password</label>
                        <input
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-3">
                            <input
                                type="checkbox"
                                id="remember-me-checkbox"
                                className="checkbox-item peer hidden"
                            />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="relative flex w-5 h-5 bg-white peer-checked:bg-red-600 rounded-md border ring-offset-2 ring-red-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                            ></label>
                            <span>Remember me</span>
                        </div>
                        <a
                            href="#"
                            className="text-center text-red-600 hover:text-red-500"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                </form>

                <button
                    className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
                >
                    <img
                        src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>
                {error && (
                    <div className="text-red-600 text-sm text-center font-medium bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                        {error}
                    </div>
                )}

                <p className="text-center">
                    Do not have an account?{' '}
                    <a
                        href="/SignUp"
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </main>
    );
};

export default Login;
