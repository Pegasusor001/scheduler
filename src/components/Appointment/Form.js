import React, { useState } from "react";
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    {props.onCancel()};
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
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
          />
        </form>

        <section className="appointment__validation">{error}</section>
        
        {props.interviewers ? (
          <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          setInterviewer={setInterviewer}
          interviewer={interviewer}
          />) : (<p></p>)
        }

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={(event) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}