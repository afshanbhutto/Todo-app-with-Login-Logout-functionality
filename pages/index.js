// pages/index.js

import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';



const Home = () => {
  return (
    
      <div className='max-w-3xl mx-auto  mt-5'>
        <h1 className='text-center font-semibold uppercase text-xl'>TODO App</h1>
        <TodoForm />
        <TodoList />
      </div>
  );
};

export default Home;
