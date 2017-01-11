describe('Store', function() {

  var store = window.lean.store;

  beforeEach(function(){
    window.localStorage.clear();
  });

  it('should implement the store interface', function(){
    expect(store.all).toBeDefined();
    expect(store.create).toBeDefined();
    expect(store.update).toBeDefined();
    expect(store.delete).toBeDefined();
  });

  it('should have an empty store at the beginning', function(done){
    store.all().then(function(todos){
      expect(todos).toEqual([]);
      done();
    });

  });

  it('should create a new todo', function(done) {
    store.create('Unit Testing').then(function(todo){
      expect(todo.text).toEqual('Unit Testing');
      expect(todo.completed).toBe(false);
      expect(todo.id).toBeDefined();
      done();
    });
  });

  it('should store a new todo', function(done) {
    store.create('Unit Testing').then(function() {
      store.all().then(function(todos){
        expect(todos.length).toEqual(1);
        expect(todos[0].text).toEqual('Unit Testing');
        done();
      });
    });
  });

  it('should store a second todo', function(done) {
    store.create('Unit Testing').then(function(){
      store.create('Development Toolchain').then(function() {
        store.all().then(function(todos){
          expect(todos.length).toEqual(2);
          expect(todos[0].text).toEqual('Unit Testing');
          expect(todos[1].text).toEqual('Development Toolchain');
          done();
        });
      });
    });
  });

  it('should update a todo', function(done) {
    store.create('Unit Testing').then(function(todo) {
      todo.completed = true;
      store.update(todo).then(function (todo) {
        expect(todo.completed).toBe(true);
        done();
      });
    });
  });

  it('should store updated todo', function(done) {
    store.create('Unit Testing').then(function(todo) {
      todo.completed = true;
      store.update(todo).then(function () {
        store.all().then(function(todos){
          expect(todos[0].completed).toBe(true);
          done();
        });
      });
    });
  });

  it('should delete a todo', function(done) {
    store.create('Unit Testing').then(function(todo) {
      store.delete(todo.id).then(function (todo) {
        store.all().then(function(todos){
          expect(todos.length).toBe(0);
          expect(todo.text).toEqual('Unit Testing');
          done();
        });
      });
    });
  });
});
