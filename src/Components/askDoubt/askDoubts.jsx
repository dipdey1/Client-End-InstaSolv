import { useState } from 'react'
import { Button, Container, Form, Select, TextArea } from 'semantic-ui-react'
import { solOptions, subjectOptions, chapterOptions } from '../../assets/staticData'
import { DATABASE_ID, USERDOUBTS_COLLECTION_ID, databases, storage, DOUBT_STORAGE_BUCKET_ID } from '../../../appwriteConfig'
import { ID } from 'appwrite'
import './askDoubts.scss'
import { useAuth } from '../../Utils/Context/AuthContext'

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

        let promise = await storage.createFile(DOUBT_STORAGE_BUCKET_ID, ID.unique(), picture)
        let payloadObject = {
            'userId': user.$id,
            'name': user.name,
            'status': 'ongoing',
            'solutionType' : solutionType,
            'subject' : subject,
            'chapter' : chapter,
            'body' : body,
            'pictureID': promise.$id
        }
        let response = await databases.createDocument(DATABASE_ID,USERDOUBTS_COLLECTION_ID,ID.unique(), payloadObject)
        setBody('')
        setChapter('')
        setPicture(null)
        setSubject('')
        setSolutionType('')
        setPictureView(null)
        
    }
       
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field control={Select} label='Subject' options={subjectOptions} placeholder='Select the Subject' value={subject} onChange={handleSubject} required={true}/>
          {(subject === 'Physics') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Physics} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : (subject === 'Chemistry') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Chemistry} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : (subject === 'Mathematics') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Mathematics} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : (subject === 'Biology') ? <Form.Field control={Select} label='Chapter Name' options={chapterOptions.Biology} placeholder='Select the Chapter' value={chapter} onChange={handleChapter} required={true}/>
          : <Form.Field control={Select} label='Chapter Name' placeholder='Select the Subject First'/>}
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
    )
}

export default AskDoubts