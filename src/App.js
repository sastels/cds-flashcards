import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Grommet } from "grommet";
import { Next } from "grommet-icons";
import yaml from "js-yaml";

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

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [teamData, setTeamData] = useState(undefined);
  const [teamDataIndex, setTeamDataIndex] = useState(0);

  useEffect(() => {
    try {
      fetch("team.yml")
        .then(raw => {
          return raw.text();
        })
        .then(text => {
          return yaml.safeLoad(text);
        })
        .then(data => {
          console.log(data);
          setTeamData(shuffle(data.exec.concat(data.team)));
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const person = teamData ? teamData[teamDataIndex] : undefined;

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">
            CDS Team
          </Heading>
          <Button label="Reveal" onClick={() => setShowSidebar(!showSidebar)} />
          <Button
            label="Next"
            icon={<Next />}
            reverse
            onClick={() => {
              if (teamData && teamDataIndex < teamData.length - 1) {
                setTeamDataIndex(teamDataIndex + 1);
              } else {
                setTeamDataIndex(0);
              }
            }}
          />
        </AppBar>

        <Box direction="column" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            {person && (
              <img
                src={`https://digital.canada.ca${person["image-name"]}`}
                alt={person.name}
              />
            )}
          </Box>
          <Box
            height="20%"
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
          >
            {showSidebar && person && (
              <React.Fragment>
                <div>{person.name}</div>
                <div>{person.title.en}</div>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Box>
      )}
    </Grommet>
  );
};

export default App;
