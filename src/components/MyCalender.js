import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles.css'
const localizer = momentLocalizer(moment)
const MyCalendar = () => {
  const [events, setEvents] = useState([])
  // fetch events from backend on component mount
  useEffect(() => {
    fetchEvents()
  }, [])
  const fetchEvents = async () => {
    // fetch events from backend API
    const response = await fetch('/api/events')
    const data = await response.json()
    // set events in state
    setEvents(data)
  }
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Enter event title:')
    if (title) {
      // create new event and add to state
      const newEvent = { start, end, title }
      setEvents([...events, newEvent])
      // send new event to backend API
      saveEvent(newEvent)
    }
  }
  const handleEdit = (event) => {
    const title = window.prompt('Edit event title:', event.title)
    if (title) {
      // update event in state
      const updatedEvent = { ...event, title }
      setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
      // send updated event to backend API
      saveEvent(updatedEvent)
    }
  }
  const handleDelete = (event) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // remove event from state
      setEvents(events.filter((e) => e.id !== event.id))
      // send delete request to backend API
      deleteEvent(event)
    }
  }
  const saveEvent = async (event) => {
    // send POST request to backend API to save event
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
  }
  const deleteEvent = async (event) => {
    // send DELETE request to backend API to delete event
    await fetch(`/api/events/${event.id}`, {
      method: 'DELETE'
    })
  }
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEdit}
        onDoubleClickEvent={handleDelete}
      />
    </div>
  )
}
export default MyCalendar
