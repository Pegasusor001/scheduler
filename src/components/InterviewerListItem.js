import React from "react"; 
import classnames from "classnames"

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) { 
  const InterviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  // const studentName = props.selected ? props.name : null

  return (
    <li className={InterviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}





