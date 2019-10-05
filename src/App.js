import React, { useState, useEffect } from "react";
import { Box, Button, Grommet, Heading, Image, Text } from "grommet";
import yaml from "js-yaml";
import { Trans } from "@lingui/macro";
import { I18nProvider, I18n } from "@lingui/react";
import catalogEn from "./locales/en/messages.js";
import catalogFr from "./locales/fr/messages.js";

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
    pad={{ left: "medium", right: "medium", vertical: "small" }}
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
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const teamUrl =
        "https://raw.githubusercontent.com/cds-snc/digital-canada-ca/master/data/team.yml";
      fetch(teamUrl)
        .then(raw => {
          return raw.text();
        })
        .then(text => {
          return yaml.safeLoad(text);
        })
        .then(data => {
          setTeamData(shuffle(data.exec.concat(data.team)));
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const person = teamData ? teamData[teamDataIndex] : undefined;

  return (
    <I18nProvider language={lang} catalogs={{ en: catalogEn, fr: catalogFr }}>
      <I18n>
        {({ i18n }) => (
          <Grommet theme={theme}>
            <Box fill>
              <AppBar>
                <Box width="10%">
                  <Heading level="1" size="small" margin="none">
                    <Trans>CDS</Trans>
                  </Heading>
                </Box>

                <Box direction="row" width="60%" justify="between">
                  <Button
                    label={i18n._("Reveal")}
                    onClick={() => setShowSidebar(!showSidebar)}
                  />
                  <Button
                    label={i18n._("Next")}
                    reverse
                    onClick={() => {
                      setShowSidebar(false);
                      if (teamData && teamDataIndex < teamData.length - 1) {
                        setTeamDataIndex(teamDataIndex + 1);
                      } else {
                        setTeamDataIndex(0);
                      }
                    }}
                  />
                </Box>

                <Box width="10%" direction="row" justify="end">
                  <Button
                    plain
                    label={
                      <Text size="medium">
                        <Trans>other-lang</Trans>
                      </Text>
                    }
                    onClick={() => {
                      setLang(i18n._("other-lang"));
                    }}
                  />
                </Box>
              </AppBar>

              <Box
                justify="center"
                align="center"
                direction="column"
                flex
                overflow={{ horizontal: "hidden" }}
              >
                <Box flex align="center" justify="center" pad="5%">
                  {person && (
                    <Image
                      width="100%"
                      src={`https://digital.canada.ca${person["image-name"]}`}
                      alt={person.name}
                    />
                  )}
                </Box>
                {showSidebar && person && (
                  <Box height="100px" align="center" justify="center">
                    <React.Fragment>
                      <Text size="xlarge">{person.name}</Text>
                      <Text size="large">
                        {i18n._("lang") === "fr"
                          ? person.title.fr
                          : person.title.en}
                      </Text>
                    </React.Fragment>
                  </Box>
                )}
              </Box>
            </Box>
          </Grommet>
        )}
      </I18n>
    </I18nProvider>
  );
};

export default App;
