import { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';

function CreatePage() {

const [name,setName] = useState("");
const [description,setDescription] = useState("");
const [content,setContent] = useState("");
const [deadline,setDeadline] = useState(null);
const [link,setLink] = useState("");
const [error,setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: name,
            description: description,
            content: content,
            expireDate: deadline,
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/pastebin/create`, data)
        .then(response => {
            setLink(`http://${window.location.host}/${response.data}`)
        }).catch(error => {
            console.error(error);
            setError(error.response.data);
        })
    }

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
        { link && <p>Your link is: <code>{link}</code></p> }
      <Form className='create-form'>
        <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control value={content} onChange={(e) => setContent(e.target.value)} as="textarea" placeholder="Content" rows={10} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Deadline</Form.Label>
            <br />
            <DateTimePicker value={deadline} onChange={(e) => setDeadline(e)} />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Create
        </Button>
        </Form>
      </header>
    </div>
  );
}

export default CreatePage;
