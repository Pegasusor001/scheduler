import React from "react";
import classnames from "classnames"

import "components/DayListItem.scss";

const formatSpots = function(num) {
  if (num === 0) {
    return "no spots remaining"
  } 
  if (num === 1) {
    return "1 spot remaining"
  }
  else {
    return `${num} spots remaining`
  }
}

export default function DayListItem(props) {
  const dayListClass = classnames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0, 
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayListClass}>{props.name}</h2>
      <h3 className={dayListClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}


