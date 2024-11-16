import {BrowserRouter, Route, Routes} from "react-router-dom";
import Validate from "./pages/validate";

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/:id' element={<Validate/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
