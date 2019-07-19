import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading
  }
}

const AppWrapper = connect(
  mapStateToProps
)(App)

export default AppWrapper