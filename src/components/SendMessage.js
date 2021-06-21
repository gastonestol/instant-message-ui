import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";

import MessageService from "../services/message.service";
import UserService from "../services/user.service";


const SendMessage = (props) => {

  const form = useRef();

  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [recipient, setRecipient] = useState("");

  const [successful, setSuccessful] = useState(false);

  const onChangeContent = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  const onChangeType = (e) => {
    const type = e.target.value;
    setType(type);
  };

  const onChangeRecipient = (e) => {
    const recipient = e.target.value;
    setRecipient(recipient);
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();
    UserService.getUser(recipient)
      .then((response) => {
        MessageService.sendMessage(response.data.id ,type, content)
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
      })
      .catch(() => {
        setSuccessful(false);
      });
    };
    
    return (
        <header className="jumbotron">
          <label className="sr-only">Send Message</label>
          <Form onSubmit={sendMessageHandler} ref={form}>
            <div class="form-row align-items-center">
            <div class="col-sm-3 my-1">
                <label className="sr-only">Recipient user name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="inlineFormInputRecipient" 
                  placeholder="Recipient user name"
                  name="recipient"
                  value={recipient}
                  onChange={onChangeRecipient}
                />
              </div>
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
                <button type="submit" class="btn btn-primary">Send</button>
              </div>
            </div>
          </Form>
        </header>
    )
}
export default SendMessage;