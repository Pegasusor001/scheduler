import React from "react"; 
import InterviewerListItem from 'components/InterviewerListItem'

import "components/InterviewerList.scss";


export default function InterviewerList(props) { 
  const interviewerList = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}  />
  })

  return (
    <section className="interviewers">
      {interviewerList}
    </section>
  );
}





