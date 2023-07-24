import React from "react";
import Converter from "./Converter";
import { ThemeProvider } from "pcln-design-system";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <header className="App-header">
          <Converter />
        </header>
      </ThemeProvider>
    );
  }
}

export default App;
