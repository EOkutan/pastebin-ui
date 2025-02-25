import { useState } from 'react';
import '../App.css';
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import { useParams } from "react-router";
import Toast from 'react-bootstrap/Toast';

function HashPage() {

    const { hash } = useParams();

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [content,setContent] = useState("");
    const [deadline,setDeadline] = useState(null);
    const [error,setError] = useState("");

    axios.get(`${process.env.REACT_APP_API_URL}/api/pastebin/${hash}`)
        .then(response => {
            setName(response.data.name);            
            setDescription(response.data.description);            
            setContent(response.data.content);            
            setDeadline(response.data.expireDate);            
        }).catch(error => {
            console.error(error);
            setError(error.response.data);
        })
    
      return (
        <div className="App">
          <header className="App-header">
          <Toast bg="danger" show={error} onClose={(e) => setError("")}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Error occurred</strong>
              </Toast.Header>
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          <Form className='create-form'>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control readOnly value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control readOnly value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control readOnly value={content} onChange={(e) => setContent(e.target.value)} as="textarea" placeholder="Content" rows={10} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <br />
                <DateTimePicker disabled value={deadline} onChange={(e) => setDeadline(e)} />
            </Form.Group>
            </Form>
          </header>
        </div>
      );
    }

export default HashPage;
