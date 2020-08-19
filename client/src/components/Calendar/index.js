import React from "react";
import FullCalendar, { render } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

export default class DemoApp extends React.Component {
    render() {
      return (
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
        />
      )
    }

    handleDateClick = (props) => {

    }
  }

