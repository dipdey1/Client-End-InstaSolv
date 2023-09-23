import React, { useEffect } from 'react'
import { Card,Image,Grid, Button } from 'semantic-ui-react'
import { useState } from 'react'
import './DoubtCards.scss'
import client, { storage,databases, DATABASE_ID, USERDOUBTS_COLLECTION_ID, DOUBT_STORAGE_BUCKET_ID } from '../../../appwriteConfig'
import moment from 'moment/moment'
import {Query} from 'appwrite'
import { useAuth } from '../../Utils/Context/AuthContext'

const CardType = () => {

    const [doubts, setDoubts] = useState([])
    const {user} = useAuth()

    useEffect(() => {
        getDoubts()

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${USERDOUBTS_COLLECTION_ID}.documents`, response => {
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                if(response.payload.userId === user.$id){
                setDoubts(prev => [response.payload,...prev])
                }
            }

            if(response.events.includes("databases.*.collections.*.documents.*.update")){
                const updateID = response.payload.$id
                if(response.payload.userId === user.$id){
                setDoubts(prev => prev.map(obj => obj.$id === updateID ? {...obj, 'status': response.payload.status} : obj))
            }}
        })

        return () => {
            unsubscribe()
        }

    },[])

    const getDoubts = async () => {
        let response = await databases.listDocuments(DATABASE_ID,USERDOUBTS_COLLECTION_ID,[
            Query.orderDesc('$createdAt'),
            Query.equal('userId',user.$id)
        ])
        setDoubts(response.documents)
    }

  return (
    <>
    <Grid columns='three' stackable={true}>
        <Grid.Row>
        {doubts.map((doubt) =>{
            return(
            <Grid.Column key={doubt.$id}>
            <Card style={{
                'height': '400px',
                marginBottom: '20px'
            }}>
                <Image className='card-img' style={{
                    'height': '200px',
                    backgroundSize: "contain",
                    }} 
      src={storage.getFilePreview(DOUBT_STORAGE_BUCKET_ID,doubt.pictureID)} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{doubt.chapter}</Card.Header>
                <Card.Meta>
                <h6 className='subject'>Subject: {doubt.subject}</h6>
                <span className='date'>{moment(doubt.$createdAt).fromNow()}</span>
            </Card.Meta>
            <Card.Description>
                {doubt.body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            {((doubt.status) === 'ongoing') ? <span>Ongoing</span> : ((doubt.status) === 'accepted') ? <Button>End Doubt</Button> : <Button>Retry</Button>}
            </Card.Content>
            </Card>
            </Grid.Column>
            )
        })}
        
        </Grid.Row>
  </Grid>
    
  </>
  )
}

export default CardType