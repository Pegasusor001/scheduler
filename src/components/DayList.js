import React from "react"; 
import DayListItem from "components/DayListItem";
import classnames from "classnames"

// import "components/Button.scss";
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];  


export default function DayList(props){
  const dayList = days.map((day) => {
    return <DayListItem 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
  })
  return <ul>{dayList}</ul>;

}