import React, { Fragment, useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
  });

  let dailyAppointments = getAppointmentsForDay(state, state.day)
  const setDay = day => setState({ ...state, day }); // day is obj, day: 'Tuesday'

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
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
        {dailyAppointments.map((appointment) => {
          console.log(appointment)
          return <Appointment 
            key={appointment.id}
            {...appointment}></Appointment>
            // equivalent to {...{key: appointment, ...appointment}}
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
