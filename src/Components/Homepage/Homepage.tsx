import GoTrue from "gotrue-js";
import Login from "../Login/Login";
import { useLocation } from "react-router-dom";

const Homepage = () => {
    const auth = new GoTrue({
            APIUrl: 'https://filmxteka.ml/.netlify/identity',
            audience: '',
            setCookie: true,
          });
    const logout = () => {
        const user = auth.currentUser();
        if(user){
            user
        .logout()
        .then(response => console.log("User logged out"))
        .catch(error => {
            console.log("Failed to logout user: %o", error);
            throw error;
        });
        }
    }
    const location = useLocation();

    if(location.hash.includes('confirmation_token')){
        auth
        .confirm(location.hash.slice(21), true)
        .then((response) => {
            console.log('Confirmation email sent', JSON.stringify({ response }));
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return(
        <>
        {auth.currentUser() ? <div className="div">{JSON.stringify(auth.currentUser())} <button onClick={logout}>logout</button></div> : <Login />}
        </>
    )
}

export default Homepage