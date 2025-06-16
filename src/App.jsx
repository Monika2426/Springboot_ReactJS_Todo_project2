import './App.css'
import ListTodoComponent from './components/ListTodoComponent.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import FooterComponent from './components/FooterComponent.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TodoComponent from './components/TodoComponent.jsx'
import RegisterComponet from './components/RegisterComponet.jsx'
import LoginComponent from './components/LoginComponent.jsx'
import { isUserLoggedIn } from './services/AuthService.js'

function App() {

  function AuthenticatedRoute({children}){
    const isAuth=isUserLoggedIn();
    if(isAuth){
      return children;
    }

    return <Navigate to="/"/>

  }


  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:8080 */}
          <Route path='/' element={<LoginComponent />}></Route>
          {/* //http://localhost:8080/todos */}
          <Route path='/todos' element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
            }></Route>
          {/* //http://localhost:8080/add-todo */}
          <Route path='/add-todo' element={
            <AuthenticatedRoute>
              <TodoComponent/>
            </AuthenticatedRoute>
            }></Route>
          {/* //http://localhost:8080/update-todo */}
          <Route path='/update-todo/:id' element={
            <AuthenticatedRoute>
              <TodoComponent/>
            </AuthenticatedRoute>
            }></Route>
          {/* //http://localhost:8080/register */}
          <Route path='/register' element={<RegisterComponet/>}></Route>
          {/* //http://localhost:8080/login */}
          <Route path='/login' element={<LoginComponent/>}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>

    </>
  )
}

export default App
