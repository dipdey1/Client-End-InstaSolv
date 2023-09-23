// import React, { useEffect, useState } from 'react'
// import {ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, databases_2 } from '../../appwriteConfigDex'
// import { Query } from 'appwrite'

// const ActiveDex = () => {
//     const [data, setData] = useState()
//     const [pool, setPool] = useState()
//     const [activePhysicsPoolOne, setActivePhysicsPoolOne] = useState()
//     const [activePhysicsPoolTwo, setActivePhysicsPoolTwo] = useState()
//     const [activePhysicsPoolThree, setActivePhysicsPoolThree] = useState()

//     useEffect(() => {
//         activePhysicsOnLoad()
//     },[])

//     const activePhysicsOnLoad = async () => {
//         const response = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality','Physics')])
//         console.log(response);
//         const filteredData = response.documents.filter(item => item.onlineStatus === true && item.solvingStatus === false)
//         setData(filteredData)
//         const totalpool = filteredData.map(obj => obj.dexName) 
//         setPool(totalpool)
//         const poolLength = Math.floor((totalpool.length)/3)
//         if(totalpool.length >= poolLength){
//         const poolOne = totalpool.slice(0,poolLength)
        
//         }
//     }

 

//   return (
//     <div>activeDex</div>
//   )
// }

// export default ActiveDex