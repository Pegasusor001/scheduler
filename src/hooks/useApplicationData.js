import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData () {
  function bookInterview(id, interview) {
    const newAppointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: newAppointment
    };
     // calling the setstate doesn't change state, but next time component rerender, use the new value of state. 
    

    const selectedNewDay = state.days.filter(day => day.name === state.day)[0]
    const selectedNewDayId = selectedNewDay.id - 1;
    
    let newDay = {
      ...state.days[selectedNewDayId],
      spots: state.days[selectedNewDayId].spots - 1
    }

    let newDays = state.days
    newDays[selectedNewDayId] = newDay;

    // console.log('newdays', newDays, 'state.days', state.days)

    return axios.put(`/api/appointments/${id}`, {interview}, newDays)
    .then(() => {
      setState({...state, appointments})
    })
  }

  function deleteInterview(id) {
    const newAppointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: newAppointment
    };

    const selectedNewDay = state.days.filter(day => day.name === state.day)[0]
    const selectedNewDayId = selectedNewDay.id - 1;
    
    let newDay = {
      ...state.days[selectedNewDayId],
      spots: state.days[selectedNewDayId].spots + 1
    }

    let newDays = state.days
    newDays[selectedNewDayId] = newDay;    

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments, newDays})
    })
  }

  const setDay = day => setState({ ...state, day }); // day is obj, day: 'Tuesday'

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);


  return {state, bookInterview, deleteInterview, setDay};
}


