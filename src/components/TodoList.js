import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { List } from 'immutable'

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} text={todo.get('text')} completed={todo.get('completed')} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList