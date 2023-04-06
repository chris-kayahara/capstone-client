import { Link } from 'react-router-dom'

export default function SignUpPage() {
    return (
        <div>
            <form>
                <label>
                    First Name
                    <input></input>
                </label>
                <label>
                    Last Name
                    <input></input>
                </label>
                <label>
                    Email
                    <input></input>
                </label>
                <label>
                    Password
                    <input></input>
                </label>
                <button>Sign Up</button>
                <Link to='/login'><button>Cancel</button></Link>
            </form>
        </div>
    )
}