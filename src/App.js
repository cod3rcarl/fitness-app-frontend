import "./App.css";
import Routes from "./routes";
import { Container } from "reactstrap";
import { ContextWrapper } from "./context";

function App() {
  return (
    <ContextWrapper>
      <Container className="App">
        <h1>Fitness App</h1>
        <div className="content">
          <Routes />
        </div>
      </Container>
    </ContextWrapper>
  );
}

export default App;
