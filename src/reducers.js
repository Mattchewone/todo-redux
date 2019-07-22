import { loop, Cmd, combineReducers } from 'redux-loop'
import { List, Map } from 'immutable'
import {
  ADD_TODO,
  TOGGLE_TODO,
  TODO_ADDED,
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
    type: TODO_ADDED,
    todo
  }
}

function todos (state = Map({ list: List(), loading: false }), action) {
  switch (action.type) {
    case ADD_TODO:
      return loop(
        state.set('loading', true),
        Cmd.run(addTodo, {
          successActionCreator: todoSuccess,
          args: [action.text]
        })
      )
    case TOGGLE_TODO:
      return state.set('list', state.get('list').map((todo, index) => {
        if (index === action.index) {
          return todo.set('completed', !todo.get('completed'))
        }
        return todo
      }))
    case TODO_ADDED:
        state = state.set('list', state.get('list').concat([Map({...action.todo })]))
        state = state.set('loading', false)

        return state
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