import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/TodoService.js'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService.js'

const ListTodoComponent = () => {

    const [todos, setTodos] = useState([])

    const navigate = useNavigate()

    const isAdmin =isAdminUser();

    useEffect(() => {
        listTodos();

    }, [])

    function listTodos() {
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error);
        });

    }

    function addNewTodo() {
        navigate('/add-todo')
    }

    function updateTodo(id) {
        navigate(`/update-todo/${id}`)
    }

    function removeTodo(id){
        deleteTodo(id).then((response)=>{
            listTodos();
        }).catch.error(error=>{
            console.error(error);
        })
    }

    function markCompleteTodo(id){
        completeTodo(id).then((response)=>{
            listTodos()
        }).catch(error=>{
            console.error(error)
        })

    }

    function markIncompleteTodo(id){
        incompleteTodo(id).then((response)=>{
            listTodos()
        }).catch(error=>{
            console.error(error)
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'> List Of Todos</h2>
            {
                isAdmin && <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
            }
            
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Todo Title</th>
                            <th>Todo Description</th>
                            <th>Todo Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed ? 'Yes' : 'No'}</td>
                                    <td>
                                        {
                                            isAdmin && <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                        }
                                        
                                        {
                                            isAdmin && <button className='btn btn-danger' onClick={()=>removeTodo(todo.id)} style={{marginLeft:"10px"}}>Delete</button>
                                        }
                                        <button className='btn btn-success' onClick={()=>markCompleteTodo(todo.id)} style={{marginLeft:"10px"}}>Complete</button>
                                        <button className='btn btn-info' onClick={()=>markIncompleteTodo(todo.id)} style={{marginLeft:"10px"}}>In Complete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodoComponent