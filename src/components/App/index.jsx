import { BrowserRouter, RouterProvider } from "react-router-dom";
import Route from "../../route";
import 'antd/dist/reset.css';
import { AliveScope } from 'react-activation'

const App = () => {
  return (
    <BrowserRouter>
      <AliveScope>
        <Route />
      </AliveScope>
    </BrowserRouter>
  );
}

export default App;
