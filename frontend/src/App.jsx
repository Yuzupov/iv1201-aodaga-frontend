import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePage from "./view/createPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/create-account" element={<CreatePage />} />
    </Routes>
  </Router>
);

export default App;