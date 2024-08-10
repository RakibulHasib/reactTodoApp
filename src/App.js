
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import TodoCrud from './components/TodoCrud';
import Home from './components/Home';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // PrimeReact CSS
import 'primeicons/primeicons.css'; // PrimeIcons CSS
import Toaster from './components/Toaster';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> <Home />
        </>
      )
    },
    {
      path: "/action",
      element: (
        <>
          <Navbar /> <TodoCrud />
        </>
      )
    }
  ])
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </div>
  );
}

export default App;
