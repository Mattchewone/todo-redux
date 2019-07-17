import { loop, Cmd, combineReducers } from 'redux-loop'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function addTodo (text) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        text,
        completed: false
      })
    }, 800)
  })
}

function todoSuccess (todo) {
  return {
    type: 'TODO_SUCCESS',
    todo
  }
}

function todoFailure () {}

function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return loop(
        [...state],
        Cmd.run(addTodo, {
          successActionCreator: todoSuccess,
          failActionCreator: todoFailure,
          args: [action.text]
        })
      )
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    case 'TODO_SUCCESS':
      return [...state, {...action.todo }]
    default:
      return state
  }
}

function visibilityFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp