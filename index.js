const app = new Vue({
  el: '#app',
  data: {
    todos: [],
    newTodo: null,
    editValue: null,
    editTodoKey: null,
    editTodoValue: null
  },
  mounted() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'))
      } catch(e) {
        localStorage.removeItem('todos')
      }
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo) {
        return
      }
      this.todos.push(this.newTodo)
      this.newTodo = ''
      this.saveTodos()
    },
    editTodo(key) {
      this.editTodoKey = key
      this.editTodoValue = this.todos[key]
    },
    updateTodo(key) {
      if (!this.editValue) {
        return
      }
      this.todos.splice(key, 1, this.editValue)
      this.editValue = ''
      this.editTodoValue = null
      this.saveTodos()
    },
    removeTodo(key) {
      this.todos.splice(key, 1)
      this.editTodoValue = null
      this.saveTodos()
    },
    saveTodos() {
      const parsed = JSON.stringify(this.todos)
      localStorage.setItem('todos', parsed)
    }
  }
})
