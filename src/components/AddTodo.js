import { connect } from 'react-redux'
import { addTodo } from '../actions'
import AddTextForm from './AddTextForm'

const mapStateToProps = state => ({
  loading: state.loading,
  children: state.loading ? 'Adding..' : 'Add todo'
})
const mapDispatchToProps = dispatch => ({
   onAdd: text => dispatch(addTodo(text))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTextForm)