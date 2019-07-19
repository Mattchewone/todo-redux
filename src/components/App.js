import React from 'react'
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ loading }) => (
  <div>
    <AddTodo loading={loading} />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App