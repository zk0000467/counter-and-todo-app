const { useState } = React

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="app">
      <h1>Counter + Todo App</h1>
      
      <section className="counter-section">
        <h2>Counter</h2>
        <div className="counter-display">Count: {count}</div>
        <div className="counter-buttons">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </div>
      </section>

      <section className="todo-section">
        <h2>Todo List</h2>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new todo..."
          />
          <button type="submit">Add</button>
        </form>

        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >All</button>
          <button 
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >Active</button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >Completed</button>
        </div>

        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        <p className="todo-stats">
          {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
        </p>
      </section>
    </div>
  )
}