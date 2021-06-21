import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import MessageService from "../services/message.service";


const MessageCard = (props) => {

  const form = useRef();

  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeContent = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  const onChangeType = (e) => {
    const type = e.target.value;
    setType(type);
  };

  const handerReply = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    MessageService.sendMessage(props.message.senderId,type, content)
        .then(() => {
          console.log("removing message id: ",props.message.id);
          const updatedList = props.messagesList.filter( (messageItem) => messageItem.id !== props.message.id);
          console.log("new list: ",updatedList);
          props.update(updatedList);
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    };
    
    return (
        <header className="jumbotron">
          <h5>MessagId: {props.message.id}</h5>
          <h5>User: {props.message.senderUserName}</h5>
          <h5>Message: {props.message.content}</h5>
          <h5>Type: {props.message.contentType} </h5>
          <Form onSubmit={handerReply} ref={form}>
            <div class="form-row align-items-center">
              <div class="col-sm-3 my-1">
                <label className="sr-only">Content</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="inlineFormInputContent" 
                  placeholder="Content or resource url"
                  name="content"
                  value={content}
                  onChange={onChangeContent}
                />
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputType">Type</label>
                <select 
                  class="custom-select custom-select-sm"
                  name="type"
                  value={type}
                  onChange={onChangeType}
                >
                  <option selected disabled >Type</option>
                  <option value="1">text</option>
                  <option value="2">image</option>
                  <option value="3">video</option>
                </select>
              </div>
              <div class="col-auto my-1">
                <button type="submit" class="btn btn-primary">Reply</button>
              </div>
            </div>
          </Form>
        </header>
    )
}

export default MessageCard;