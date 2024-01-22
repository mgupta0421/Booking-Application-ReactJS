import {Link} from "react-router-dom"

export default function RegisterPage(){
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    function registerUser() {

    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4"> Register</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>
                <input type="text"
                 value = {name} 
                 onChange={ev => setName(ev.target.value)}/>
                <input type="email" 
                value = {email} 
                onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" 
                value = {password}
                onChange= {ev => setPassword(ev.target.value)} />
                <button className="primary"> Register </button>
                <div>
                    Dont have a account ?
                    <Link to ={'/login'}> Login
                    </Link>
                </div>

            </form>
            </div>
            
        </div>
    );

}
