import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../../../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getUserOnLoad()
    },[])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
            console.log(accountDetails);
        } catch (error) {
            console.info(error)
        }
        setLoading(false)
    }


    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        try{

            const response = await account.createEmailSession(credentials.email, credentials.password)
            const accountDetails = await account.get()
            setUser(accountDetails)
            console.log(accountDetails);
            navigate('/home')

        }catch(e){
            console.error(e)
        }
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        
        try {
            let response = await account.create(ID.unique(),credentials.email, credentials.password,credentials.name)
            console.log(response);

            await account.createEmailSession(credentials.email, credentials.password)
            const accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/home')
            

        } catch (error) {
            console.info(error)
        }

    }

    const contextData ={
        user, handleUserLogin, handleUserLogout, handleRegister
    }

    return(
    <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return (
        useContext(AuthContext)
    )
}
export default AuthContext