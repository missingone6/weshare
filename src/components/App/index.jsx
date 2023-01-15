import { RouterProvider } from "react-router-dom";
import Route from "../../route";
import 'antd/dist/reset.css';

const App = () => {
  return (
    <RouterProvider
      router={Route}
    />
  );
}

export default App;
