import Routes from "./routes";

import { ContextWrapper } from "./context";

function App() {
  return (
    <ContextWrapper>
      <Routes />
    </ContextWrapper>
  );
}

export default App;
