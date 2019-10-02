import React, { useState } from "react";
import { Box, Button, Heading, Grommet } from "grommet";
import { Next } from "grommet-icons";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">
            CDS Team
          </Heading>
          <Button label="Reveal" onClick={() => setShowSidebar(!showSidebar)} />
          <Button label="Next" icon={<Next />} reverse onClick={() => {}} />
        </AppBar>

        <Box direction="column" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            app body
          </Box>
          <Box
            height="20%"
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
          >
            {showSidebar && <div>Steve</div>}
          </Box>
        </Box>
      </Box>
      )}
    </Grommet>
  );
};

export default App;
