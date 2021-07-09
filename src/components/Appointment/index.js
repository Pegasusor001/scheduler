import React, { useState } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import "components/Appointment/index.js";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW)
    })
  }

  function Confirmation() {
    transition(CONFIRM);
  }

  function Edit() {
    transition(EDIT);
  }

  function onDelete() {
    transition(DELETE)
    props.deleteInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    })
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={Confirmation}
          onEdit={Edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel ={back}
          onSave = {(name, interviewer) => onSave(name, interviewer)}
        />
      )}

      {mode === SAVING && (
          <Status
          message="Saving data"
          />
        )}

      {mode === DELETE && (
        <Status
        message="deleteing data"
        />
      )}      
      
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete your appointment?"
          onCancel={back}
          onConfirm={onDelete}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={back}
        />
      )}



    </article>
  )
}

