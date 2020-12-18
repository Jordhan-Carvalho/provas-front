import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TestUploadPage from "./pages/TestUploadPage/TestUploadPage";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import TestsPage from "./pages/TestsPage";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/tests" component={TestsPage} />
        <Route path="/test-upload" component={TestUploadPage} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
:root {
  --gradient: linear-gradient(to right, #f7f8f8, #acbb78);
  --generalFont: 'Baloo 2', cursive;
  --titleFont: 'Press Start 2P', cursive;
}

body {
  font-family: var(--generalFont);
  color: white;
}

#root {
  min-height: 100vh;
  width: 100%;
  background: var(--gradient);
}

`;
