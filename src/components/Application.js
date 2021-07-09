import React, { Fragment, useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const InterviewersForDay = getInterviewersForDay(state, state.day);
  
  const appointment = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // console.log(appointment)
    // console.log('.......',interview)
    // console.log(dailyAppointments)
    // console.log("interviewforday:", InterviewersForDay)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={InterviewersForDay}
      />
    );
  });

  const setDay = day => setState({ ...state, day }); // day is obj, day: 'Tuesday'
  const setDays = days => setState(prev => ({ ...prev, days })); // // days is obj, days: {days: []}

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(previouse => ({...previouse, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          alt="Interview Scheduler"
          src="images/logo.png"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />        
      </section>
    </main>
  );
}
