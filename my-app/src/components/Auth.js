import { auth, provider} from "../firebase-config.js";
import { signInWithPopup } from  "firebase/auth";
// import { async } from "@firebase/util";
import Cookies from "universal-cookie";
const cookies = new Cookies()

export const Auth = (props) => {
    const { setIsAuth } = props;

    const signInwithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("autho-token", result.user.refreshToken);
            setIsAuth(true);
        }
        catch(err){
            console.error(err);
        }
    };

    return (
    <div className="auth">
        <p>Sign In with Google To continue</p>
        <button onClick={signInwithGoogle}>Sign in with google</button>
    </div>
    );
};