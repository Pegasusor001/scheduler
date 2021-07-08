export function getAppointmentsForDay(state, day) {
  const  selectedDay = state.days.filter(eachday => eachday.name === day);
  if (selectedDay.length !== 0) {
    const filteredAppointmentsId = selectedDay[0].appointments;
    const filteredAppointments = filteredAppointmentsId.map(id => {
      id = id + '';
      return state.appointments[id]
    })
    return filteredAppointments;
  } else {
    return [];
  }
}

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

// function getAppointmentsForDay(state, day) {
//   const filteredAppointmentsId = state.days.filter(eachday => eachday.name === day)[0].appointments;
//   console.log(filteredAppointmentsId)
//   filteredAppointments = filteredAppointmentsId.map(id => {
//     id = id + '';
//     return state.appointments[id]
//   })
//   return filteredAppointments;
// }

// console.log(getAppointmentsForDay(state, "Tuesday"))