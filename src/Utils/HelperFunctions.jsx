import { Query } from "appwrite";
import { DATABASE_ID, USERDOUBTS_COLLECTION_ID, databases } from "../../appwriteConfig";
import { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, databases_2 } from "../../appwriteConfigDex";
import { useAuth } from "./Context/AuthContext";

export const poolOneHelper = async (response, poolOne,subject) => {
            let payload = {
                doubtID: response.$id
            }
            for(let i=0; i<poolOne.length; i++){
                let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolOne[i],payload)
                console.log(activePromise);
            }
            let flag = false;
            setTimeout(function() {
                if(!flag){
                    poolOneHelperCleanup(response,poolOne,subject)
                }else{
                    flag=true
                }
            },300000)
}

export const poolOneHelperCleanup = async (response,poolOne,subject) => {
    try {
        let secondresponse = await databases.getDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id)
        if(secondresponse.status === 'ongoing'){
        let deleteRouting = {
            doubtID: null
        }
        for(let i=0; i<poolOne.length; i++){
            let activePromise2 = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolOne[i],deleteRouting)
        }
            }
            let responsePool = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality',subject),Query.orderDesc('score')])
            const totalPoolTwoPool = responsePool.documents.filter(item => item.onboardingStatus === true && item.onlineStatus === true && item.solvingStatus === false && item.routingStatus === true).map(obj => obj.$id)
            const totalPoolTwo = totalPoolTwoPool.filter(item => !poolOne.includes(item))
            const poolLength = Math.floor((totalPoolTwoPool.length)/3) + 1
            const poolTwo = totalPoolTwo.slice(0,poolLength)

        poolTwoHelper(response,poolTwo,subject,poolOne)
    } catch (error) {
        console.log(error)
    }
}

export const poolTwoHelper = async (response, poolTwo,subject,poolOne) => {
    let payload = {
        doubtID: response.$id
    }
    for(let i=0; i<poolTwo.length; i++){
        let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolTwo[i],payload)
        console.log(activePromise);
    }
    let flag = false;
    setTimeout(function() {
        if(!flag){
            poolTwoeHelperCleanup(response,poolTwo,subject,poolOne)
        }else{
            flag=true
        }
    },300000)
}

export const poolTwoeHelperCleanup = async (response,poolTwo,subject,poolOne) => {
    try {
        let secondresponse = await databases.getDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id)
        if(secondresponse.status === 'ongoing'){
        let deleteRouting = {
            doubtID: null
        }
        for(let i=0; i<poolTwo.length; i++){
            let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,poolTwo[i],deleteRouting)
        }
            }
            let responsePool = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality',subject),Query.orderDesc('score')])
            const exclusionPool = poolOne.concat(poolTwo)
            const totalPoolThree = responsePool.documents.filter(item => item.onboardingStatus === true && item.onlineStatus === true && item.solvingStatus === false && item.routingStatus === true).map(obj => obj.$id).filter(item => !exclusionPool.includes(item))

            poolThreeHelper(response,totalPoolThree,subject)
    } catch (error) {
        console.log(error)
    }
}

export const poolThreeHelper = async (response, totalPoolThree,subject) => {
    let payload = { 
        doubtID: response.$id
    }
    for(let i=0; i<totalPoolThree.length; i++){
        let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,totalPoolThree[i],payload)
        console.log(activePromise);
    }
    let flag = false;
    setTimeout(function() {
        if(!flag){
            poolThreeHelperCleanup(response,totalPoolThree,subject)
        }else{
            flag=true
        }
    },300000)
}

export const poolThreeHelperCleanup = async (response,totalPoolThree,subject) => {
    try {
        let secondresponse = await databases.getDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id)
        if(secondresponse.status === 'ongoing'){
        let deleteID = {
            doubtID: null
        }
        for(let i=0; i<totalPoolThree.length; i++){
            let activePromise = await databases_2.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,totalPoolThree[i],deleteID)
        }
        let finalresponse = await databases.updateDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,response.$id, {status: 'Retry'})
    }
    } catch (error) {
        console.log(error)
    }
}


