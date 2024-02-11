import { Row, Col, Form , Button} from "react-bootstrap"
import { useState, useContext } from "react"
import UserContext from "../Context/UserContext"
import {postComment} from "../Api"

export default function AddComment(props){
const {article_id, setComments, commentCount, setCommentCount, setHasCommented} = props
const loggedInUser = useContext(UserContext)
const [newComment, setNewComment] = useState("")
const username = loggedInUser.username

function handleSubmit(event){
    event.preventDefault();
    
    postComment( article_id, {
        body: newComment,
        username: username
    })
    .then((postedComment)=>{
        setNewComment("")
        setHasCommented(true)
        setCommentCount(commentCount + 1)
        alert("Success! Your comment was posted 🥳")
        setComments((currentComments)=>{
            return [postedComment, ...currentComments]
        })
    })
    .catch(()=>{
        alert("Sorry, your comment couldn't be posted. Please try again 😥")
    })
}

return (
    // <Row >
    //         <Col sm={8}>
    //         <Form onSubmit={handleSubmit}>
    //         <Form.Group className="comment-form">
    //         <Form.Control type="text" placeholder="Write your comment..." value={newComment} onChange={(event)=>{
    //             setNewComment(event.target.value)
    //         }}className="mr-sm-2" required/>
    //         <Button variant ="primary" type="submit" >Post ➣</  Button>
    //         </Form.Group>
    //         </Form>
    //         </Col>
    //         </Row>
<Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
        <Col sm={10}>
          <Form.Control
            className="mb-2"
            id="comment-form-input"
            placeholder="Write your comment..." value={newComment} onChange={(event)=>{
                setNewComment(event.target.value)
            }} required
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit" className="mb-2">
          Post ➣
          </Button>
        </Col>
      </Row>
    </Form>

)
}

