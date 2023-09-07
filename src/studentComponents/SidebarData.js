import React from 'react'

export const SidebarData = [
  {
    title:'Home',
    path:'/Home',

    subNav : []
  },
  {
    title: 'Grades',
    path: '/A1',

    subNav : []

  },
  {
    title: 'Modules',
    path: '/Products',

    subNav: [
      {
        title: 'Week 1 Modules',
        path: '/Products/M1'
      },
      {
        title: 'Week 2 Modules',
        path: '/Products/M2'
      }
    ]
  },
  {
    title: 'Assignments',
    path: '/Assignments',

    /*subNav: [
      {
        title: 'Lecture Summary 1',
        path: '/Assignments/Ass1'
      },
      {
        title: 'Lecture Summary 2',
        path: '/Assignments/Ass2'
      }
    ]*/
  },

  {
    title: 'Chat',
    path: '/Chats',
    subNav : []
  }
]
