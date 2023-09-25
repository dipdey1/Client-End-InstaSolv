import { createContext, useState, useEffect, useContext } from "react";
import { DATABASE_ID, USERDOUBTS_COLLECTION_ID, USERTABLE_ID, account, databases } from "../../../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID, Query } from "appwrite";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { data } from "jquery";
import { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, databases_2 } from "../../../appwriteConfigDex";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentPool, setCurrentPool] = useState([])
    const [doubtID, setDoubtID] = useState(null)

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

    const poolOneHelper = async (response,subject) => {
        let responsePool = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality',subject),Query.orderDesc('score')])
            setDoubtID(response.$id)
            const totalpool = responsePool.documents.filter(item => item.onboardingStatus === true && item.onlineStatus === true && item.solvingStatus === false && item.routingStatus === true && item.currentRoutingStatus === false).map(obj => obj.$id)
            const poolLength = Math.floor((totalpool.length)/3)+1
            const poolOne = totalpool.slice(0,poolLength)
            setCurrentPool(poolOne)
        let payload = {
            currentRoutingStatus: true,
            doubtID: response.$id
        }
        for(let i=0; i<poolOne.length; i++){
            await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolOne[i],payload)
        }
        let flag = false;
        setTimeout( async function() {
            if(!flag){
                try {
                    let secondresponse = await databases.getDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id)
                    if(secondresponse.status === 'ongoing'){
                    let deleteRouting = {
                        currentRoutingStatus: false,
                        doubtID: null
                    }
                    for(let i=0; i<poolOne.length; i++){
                        let activePromise2 = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolOne[i],deleteRouting)
                    }
                        
                        let responsePool = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality',subject),Query.orderDesc('score')])
                        const totalPoolTwoPool = responsePool.documents.filter(item => item.onboardingStatus === true && item.onlineStatus === true && item.solvingStatus === false && item.routingStatus === true && item.currentRoutingStatus === false).map(obj => obj.$id)
                        const totalPoolTwo = totalPoolTwoPool.filter(item => !poolOne.includes(item))
                        const poolLength = Math.floor((totalPoolTwoPool.length)/3) + 1
                        const poolTwo = totalPoolTwo.slice(0,poolLength)
                        setCurrentPool(poolTwo)
                        let payload = {
                            currentRoutingStatus: true,
                            doubtID: response.$id
                            }
                            for(let i=0; i<poolTwo.length; i++){
                            let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolTwo[i],payload)
                            console.log(activePromise);
                            }
                            let flag = false;
                            setTimeout(async function() {
                            if(!flag){
                                try {
                                    let secondresponse = await databases.getDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id)
                                    if(secondresponse.status === 'ongoing'){
                                    let deleteRouting = {
                                        currentRoutingStatus: false,
                                        doubtID: null
                                    }
                                    for(let i=0; i<poolTwo.length; i++){
                                        let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolTwo[i],deleteRouting)
                                    }
                                        
                                        let responsePool = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality',subject),Query.orderDesc('score')])
                                        const exclusionPool = poolOne.concat(poolTwo)
                                        const totalPoolThree = responsePool.documents.filter(item => item.onboardingStatus === true && item.onlineStatus === true && item.solvingStatus === false && item.routingStatus === true && item.currentRoutingStatus === false).map(obj => obj.$id).filter(item => !exclusionPool.includes(item))
                                        setCurrentPool(totalPoolThree)
                                        let payload = { 
                                            currentRoutingStatus: true,
                                            doubtID: response.$id
                                            }
                                            for(let i=0; i<totalPoolThree.length; i++){
                                            let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,totalPoolThree[i],payload)
                                            console.log(activePromise);
                                            }
                                            let flag = false;
                                            setTimeout(async function() {
                                            if(!flag){
                                                try {
                                                    let secondresponse = await databases.getDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id)
                                                    if(secondresponse.status === 'ongoing'){
                                                    let deleteID = {
                                                        currentRoutingStatus: false,
                                                        doubtID: null
                                                    }
                                                    for(let i=0; i<totalPoolThree.length; i++){
                                                        let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,totalPoolThree[i],deleteID)
                                                    }
                                                    setCurrentPool([])
                                                    let finalresponse = await databases.updateDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id, {status: 'Retry'})
                                                    }
                                                    } catch (error) {
                                                    console.log(error)
                                                    }
                                            }else{
                                                flag=true
                                            }
                                            },50000)
                                    }
                                    } catch (error) {
                                    console.log(error)
                                    }
                            }else{
                                flag=true
                            }
                            },50000)
                    }
                    } catch (error) {
                    console.log(error)
                    }
            }else{
                flag=true
            }
        },50000)
    }

    const deleteRouting = async (currentPool) =>{
        let deleteID = {
            currentRoutingStatus: false,
            doubtID: null
        }
        for(let i=0; i<currentPool.length; i++){
            await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,currentPool[i],deleteID)
        }
    }

    const contextData ={
        user, handleUserLogin, handleUserLogout, handleRegister,handleOauth2Login,handleVerification, updateVerification, poolOneHelper, currentPool, doubtID, deleteRouting
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