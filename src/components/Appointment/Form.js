import React, { useState } from "react";
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    {props.onCancel()};
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            onChange = {(e) => setName(e.target.value)}
            value={name}
            onSubmit={event => event.preventDefault()}
          />
        </form>

        <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        setInterviewer={setInterviewer}
        interviewer={interviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button 
            danger
            onClick={props.onCancel}
          >Cancel</Button>
          <Button 
            confirm
            onClick={() => {props.onSave(name)}}
          >Save</Button>
        </section>
      </section>
    </main>
  )
}