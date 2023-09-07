import React, { useState } from 'react'
import './Chats.css'
export default function Chats () {
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState({})

  function handleUserClick (user) {
    setSelectedUser(user)
  }

  function handleSearchQueryChange (event) {
    setSearchQuery(event.target.value)
  }

  function handleSendMessage (message) {
    setChats((prevChats) => ({
      ...prevChats,
      [selectedUser.id]: [...(prevChats[selectedUser.id] || []), message]
    }))
  }

  const filteredUsers = searchQuery
    ? users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : users

  return (
    <div className="App">
      <div className="Sidebar">
        <div className="SearchBar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search users"
          />
        </div>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <Chat
          user={selectedUser}
          messages={chats[selectedUser.id] || []}
          onSendMessage={handleSendMessage}
          onCloseChat={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}

function Chat ({ user, messages, onSendMessage, onCloseChat }) {
  const [messageText, setMessageText] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    const message = {
      id: Date.now(),
      text: messageText,
      date: new Date()
    }
    onSendMessage(message)
    setMessageText('')
  }

  function handleInputChange (event) {
    setMessageText(event.target.value)
  }

  return (
    <div className="Chat">
      <div className="ChatHeader">
        <h2>{user.name}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageForm
        messageText={messageText}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

function MessageList ({ messages }) {
  return (
    <div className="MessageList">
      {messages.map((message) => (
        <div key={message.id} className="Message">
          <div className="Message__text">{message.text}</div>
          <div className="Message__date">{formatDate(message.date)}</div>
        </div>
      ))}
    </div>
  )
}

function MessageForm ({ messageText, onInputChange, onSubmit }) {
  return (
    <form className="MessageForm" onSubmit={onSubmit}>
      <input
        type="text"
        value={messageText}
        onChange={onInputChange}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  )
}

function formatDate (date) {
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const users = [
  { id: 1, name: 'Atharva' },
  { id: 2, name: 'Akshada' },
  { id: 3, name: 'Adesh' },
  { id: 4, name: 'Sophie' },
  { id: 5, name: 'Sydney' },
  { id: 6, name: 'Group Chat' }
]
