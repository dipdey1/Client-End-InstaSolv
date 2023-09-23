import { createContext, useState, useEffect, useContext } from "react";
import { DATABASE_ID, USERTABLE_ID, account, databases } from "../../../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { data } from "jquery";


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
            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.info(error)
        }
        setLoading(false)
    }

    const updateVerification = async (userId, secret) => {
        try {
          const promise = await account.updateVerification(userId, secret)
          navigate('/home')
        } catch (error) {
          console.log('error',error);
        }
      }


    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        try{
            let response = await account.createEmailSession(credentials.email, credentials.password)
            let accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/home')
        }catch(e){
            console.error(e)
        }
        setLoading(false)
    }

    const handleOauth2Login = async (e) => {
        e.preventDefault()
        try {
            account.createOAuth2Session('google','http://localhost:5173/home','https://localhost:5173/login')
            let response = await account.getSession('current')
            console.log(response);

        } catch (error) {
            console.info(error)
        }
        setLoading(false)
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        
        try {
            let response = await account.create(ID.unique(),credentials.email, credentials.password,credentials.name)
            console.log(response);
            let userTableObject = {
                userId: response.$id,
                name: response.name,
                email: response.email,
                userType: 'STUDENT',
                subscriptionType: 'NOT PAID',
                emailVerification: response.emailVerification,
                phone: response.phone,
                phoneVerification: response.phoneVerification,
                registrationDate: response.registration,
            }
            const userTableResponse = await databases.createDocument(DATABASE_ID, USERTABLE_ID, ID.unique(), userTableObject)
            console.log(userTableResponse);
            await account.createEmailSession(credentials.email, credentials.password)
            await account.createVerification('http://localhost:5173/home')
            const accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.info(error)
        }
        setLoading(false)
    }

    const handleVerification = async () => {
        let promise = await account.createVerification('http://localhost:5173/profile')
        console.log(promise);
    }

    const contextData ={
        user, handleUserLogin, handleUserLogout, handleRegister,handleOauth2Login,handleVerification, updateVerification
    }

    return(
    <AuthContext.Provider value={contextData}>
        {loading ? <LoadingPage/> : children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return (
        useContext(AuthContext)
    )
}
export default AuthContext