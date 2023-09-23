import { useEffect, useState } from 'react'
import { Button, Container, Form, Header, Select, TextArea } from 'semantic-ui-react'
import { solOptions, subjectOptions, chapterOptions } from '../../assets/staticData'
import { DATABASE_ID, USERDOUBTS_COLLECTION_ID, databases, storage, DOUBT_STORAGE_BUCKET_ID, account } from '../../../appwriteConfig'
import { ID, Query } from 'appwrite'
import './askDoubts.scss'
import { useAuth } from '../../Utils/Context/AuthContext'
import { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, databases_2 } from '../../../appwriteConfigDex'
import { poolOneHelper, poolTwoHelper } from '../../Utils/HelperFunctions'

const AskDoubts = () => {

    const [subject, setSubject] = useState('')
    const [chapter, setChapter] = useState('')
    const [solutionType, setSolutionType] = useState('')
    const [body, setBody] = useState('')
    const [picture, setPicture] = useState(null);
    const [pictureView, setPictureView] = useState(null)
    const {user} = useAuth()

    

    const handleSubject = (e,results) => {
        setSubject(results.value)
    }
    const handleSolutionType = (e,results) => {
        
        setSolutionType(results.value)
    }
    const handleBody = (e) => {
        setBody(e.target.value)
    }
    const handleChapter = (e, results) => {
        setChapter(results.value)
    }
    const onChangePicture = e => {
        setPicture(e.target.files[0])
        setPictureView(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const now = Math.floor(Date.now())
        const thirtyMinutesAgo = now - 1800000
        const response = account.listLogs()
        console.log(response);
        // let promise = await storage.createFile(DOUBT_STORAGE_BUCKET_ID, ID.unique(), picture)
        // let payloadObject = {
        //     'userId': user.$id,
        //     'name': user.name,
        //     'status': 'ongoing',
        //     'solutionType' : solutionType,
        //     'subject' : subject,
        //     'chapter' : chapter,
        //     'body' : body,
        //     'pictureID': promise.$id
        // }
        // let response = await databases.createDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,ID.unique(), payloadObject)
        // let responsePool = await databases_2.listDocuments(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexSpeciality',subject),Query.orderDesc('score')])
        // const totalpool = responsePool.documents.filter(item => item.onboardingStatus === true && item.onlineStatus === true && item.solvingStatus === false && item.routingStatus === false).map(obj => obj.$id)
        // const poolLength = Math.floor((totalpool.length)/3) + 1
        // const poolOne = totalpool.slice(0,poolLength)
        // poolOneHelper(response,poolOne,subject)

        // setBody('')
        // setChapter('')
        // setPicture(null)
        // setSubject('')
        // setSolutionType('')
        // setPictureView(null)  
    }
       
    return (<>
        {(user.emailVerification) ?  
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
          <Form.Field control={Select} label='Subject' options={subjectOptions} placeholder='Select the Subject' value={subject} onChange={handleSubject} required={true}/>
          {(subject === 'Physics') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Physics} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : (subject === 'Chemistry') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Chemistry} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : (subject === 'Mathematics') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Mathematics} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : (subject === 'Biology') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Biology} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : <Form.Field label='Chapter Name' placeholder='Select the Subject First'/>}
          <Form.Field control={Select} label='Solution Type' options={solOptions} placeholder='Choose A Solution Type' value={solutionType} onChange={handleSolutionType} required={true}/>
        </Form.Group>
        <Form.Field control={TextArea} label='About' placeholder='Tell us more about your doubt...' value={body} onChange={handleBody}/>
        <label htmlFor="embedpollfileinput" className="ui green left floated button custom-margin">
            <i className="ui upload icon"></i> 
                Upload image
            </label>
          <input type="file" id="embedpollfileinput" style={{'display':'none'}} onChange={onChangePicture}/>
        <img src={pictureView} alt="" />
        <Form.Field control={Button} type='submit' className='submit'>Submit</Form.Field>
      </Form>
      :<>
      <Header as='h1' color='black'textAlign='center'>Please Verify your Email Address</Header>
      <hr />
      <br />
      <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
            <Form.Field control={Select} label='Subject' options={subjectOptions} placeholder='Select the Subject' value={subject} onChange={handleSubject} required={true} disabled={true}/>
        {(subject === 'Physics') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Physics} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true} disabled={true}/>
        : (subject === 'Chemistry') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Chemistry} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true} disabled={true}/>
        : (subject === 'Mathematics') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Mathematics} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true} disabled={true}/>
        : (subject === 'Biology') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Biology} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true} disabled={true}/>
        : <Form.Field label='Chapter Name' placeholder='Select the Subject First'  disabled={true}/>}
        <Form.Field control={Select} label='Solution Type' options={solOptions} placeholder='Choose A Solution Type' value={solutionType} onChange={handleSolutionType} required={true} disabled={true}/>
      </Form.Group>
      <Form.Field control={TextArea} label='About' placeholder='Tell us more about your doubt...' value={body} onChange={handleBody} disabled={true}/>
      <label htmlFor="embedpollfileinput" className="ui green left floated button custom-margin">
          <i className="ui upload icon"></i> 
              Upload image
          </label>
        <input type="file" id="embedpollfileinput" style={{'display':'none'}} onChange={onChangePicture} disabled={true}/>
      <img src={pictureView} alt="" />
      <Form.Field control={Button} type='submit' className='submit' disabled={true}>Submit</Form.Field>
    </Form>
    </>
        }

    
        </>)}

export default AskDoubts