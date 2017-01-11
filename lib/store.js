(function(window) {

  var store = {
    all: all,
    create: create,
    update: update,
    delete: remove
  };

  // Global export
  window.lean = window.lean || {};
  window.lean.store = store;

  // Implementation

  function all() {
    return new Promise(function(resolve){
      resolve(load());
    });
  }

  function create(text) {
    return new Promise(function(resolve,reject){

      if (!text) {
        reject('Todos must be non-empty strings');
      }

      var t = {
        text: text,
        completed: false
      };

      var todos = load();
      t.id = todos.length === 0 ? 1 : todos[todos.length-1].id -1;
      todos.push(t);

      localStorage.setItem('todos-lean', JSON.stringify(todos));

      resolve(t);
    });
  }

  function update(todo) {
    return new Promise(function(resolve,reject){

      var todos = load();

      var ix = todos.findIndex( function(t) { return t.id === todo.id; });
      if (ix === -1) reject('Todo not found');

      todos[ix] = todo;

      localStorage.setItem('todos-lean', JSON.stringify(todos));

      resolve(todo);
    });
  }

  function remove(id) {
    return new Promise(function(resolve,reject){

      var todos = load();

      var ix = todos.findIndex( function(t) { return t.id === id; });
      if (ix === -1) reject('Todo not found');

      var todo = todos.splice(ix,1)[0];

      localStorage.setItem('todos-lean', JSON.stringify(todos));

      resolve(todo);
    });
  }

  // Private helpers (not exported)
  function load() {

    var todos = localStorage.getItem('todos-lean');

    if (todos === null) {
      todos = [];
      localStorage.setItem('todos-lean', JSON.stringify(todos));
      return todos;
    }

    return JSON.parse(todos);
  }

})(window);
