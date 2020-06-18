import React from "react";
import "./GoogleCalendar.scss";

export default class GoogleCalendar extends React.Component {

  render() {
    return (
      <div className="googleCalendar">
        <iframe
          title="calendar"
          name="calendar"
          id="calendar"
          src="https://calendar.google.com/calendar/embed?height=632&amp;wkst=2&amp;bgcolor=%23edeef0&amp;ctz=Europe%2FMoscow&amp;src=YWdyZWJlbm5pa292LmV4Y2VlZHRlYW1AZ21haWwuY29t&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=cnUucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=0&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=0&amp;showTz=0"
          style={{ border: 0, width: 840, height: 652, frameborder: 0 }}
        ></iframe>
      </div>
    );
  }
}
