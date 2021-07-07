import React, { useState } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import "components/Appointment/index.js";


export default function Appointment(props) {
  const page = props.interview ? <Show></Show> : <Empty></Empty>

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {page}
    </article>
  )
}
