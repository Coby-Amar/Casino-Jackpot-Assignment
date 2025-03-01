import { ChangeEvent, FC, FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import styles from './Signup_Login.module.css'

import Input from '~/components/Input/Input.component'
import { ApiService, LoginData } from '~/services/api.service'
import { GlobalReducerActions, GlobalStoreContext } from '~/services/state.service'

const SignupLoginPage: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { state, dispatch } = useContext(GlobalStoreContext)

    const [formData, setFormData] = useState<LoginData>({
        username: '',
        password: ''
    })
    const isLogin = location.pathname.includes('login')

    useEffect(() => {
        if (state.isAuthenticated) {
            navigate('/slot_machine', { replace: true })
        }
    }, [navigate, state.isAuthenticated])

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (isLogin) {
                const user = await ApiService.login(formData)
                dispatch!({ type: GlobalReducerActions.LOGIN, payload: user })
            } else {
                const user = await ApiService.signup(formData)
                dispatch!({ type: GlobalReducerActions.LOGIN, payload: user })
            }
            navigate('/slot_machine', { replace: true })
        } catch (error) {
            console.error('error: ', error)
        }
    }, [dispatch, formData, isLogin, navigate])

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }, [formData])

    return (
        <div className={styles.container}>
            <h1>Welcome to Casino jackpot</h1>
            <form onSubmit={handleSubmit} className="formContainer">
                <Input
                    name='username'
                    type='email'
                    label='Username'
                    placeholder='Enter Username'
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <Input
                    name='password'
                    type='password'
                    label='Password'
                    placeholder='Enter password'
                    onChange={handleInputChange}
                    value={formData.password}
                />
                <button type='submit' className='button submit'>{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            {isLogin ?
                <div>
                    Dont have an account? <NavLink to="/signup">Signup here</NavLink>
                </div>
                : <div>
                    Have an account? <NavLink to="/login">Login</NavLink>
                </div>
            }
        </div>
    )
}

export default SignupLoginPage