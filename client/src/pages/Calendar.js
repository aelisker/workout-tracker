import React, {useEffect} from "react";
import FullCalendar, { render } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

export default class Calendar extends React.Component {
    handleDateClick = (arg) => {
        alert(arg.dateStr)
    }
    render() {
        return (
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            weekends={true}
            events={[
                { workout: 'workout 1', date: '2020-08-14' }
            ]}
            dateClick={this.handleDateClick}
          />
        )
      }
}

