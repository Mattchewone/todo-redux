import { loop, Cmd, combineReducers } from 'redux-loop'
import {
  ADD_TODO,
  TOGGLE_TODO,
  TODO_ADDED,
  SET_VISIBILITY_FILTER,
  TOGGLE_LOADING,
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
    type: TODO_ADDED,
    todo
  }
}

function loading (state = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return !state
    default:
      return state
  }
}

function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return loop(
        [...state],
        Cmd.list([
          Cmd.action({
            type: TOGGLE_LOADING
          }),
          Cmd.run(addTodo, {
            successActionCreator: todoSuccess,
            args: [action.text]
          })
        ])
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
    case TODO_ADDED:
      return loop(
        [...state, {...action.todo }],
        Cmd.action({
          type: TOGGLE_LOADING
        })
      )
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
  todos,
  loading
})

export default todoApp