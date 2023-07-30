import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//Redux configuration
import { Provider } from 'react-redux'
import store from './store'
import { IntlProvider } from 'react-intl'
import './App.css'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PrivateRoute from './components/routing/PrivateRoute'
import intlMessages from './messages.json'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {

  useEffect(() => { // if there is a change in the lif cycle for component
    store.dispatch(loadUser())
  }, []) // if I remove the [] - seconed parameter - so will always runs - infinite - so with the [] will run once - its like componentDidMount
  return (
    <IntlProvider locale="en" messages={intlMessages}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Alert />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
              <Route path='/edit-profile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
              <Route path='/add-education' element={<PrivateRoute><AddEducation /></PrivateRoute>} />
              <Route path='/posts' element={<PrivateRoute><Posts /></PrivateRoute>} />
              <Route path='/posts/:id' element={<PrivateRoute><Post /></PrivateRoute>} />
              <Route path='/add-experience' element={<PrivateRoute><AddExperience /></PrivateRoute>} />
            </Routes>
          </Fragment>
        </Router>
      </Provider>
    </IntlProvider>
  )
}
export default App
