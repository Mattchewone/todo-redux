import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = ({ loading }) => (
  <div>
    <AddTodo loading={loading} />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App