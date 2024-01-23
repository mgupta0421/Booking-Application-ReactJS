import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";


export default function ProfilePage() {
    const {ready, user} = useContext(UserContext);

if(!ready) {
    return 'Loading....';
}

if(ready && !user) {
    return <Navigate to ={'/login'} />
}
    
return (
        <div>
            This is account page. {user.name}
        </div>
    );
}