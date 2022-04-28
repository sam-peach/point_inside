import { useState, useEffect, ChangeEvent } from "react";
import { getTimezone } from "./timezone_api";
import { NumberInput, Box } from "./components";
import { timezoneSecondsToHours } from "./utils";
import { TimezoneData } from "./types";

function App() {
  const [long, setLong] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [timezoneData, setTimezoneData] = useState<TimezoneData>();

  useEffect(() => {
    const fetchTimezone = async () => {
      if (lat && long) {
        try {
          const { data } = await getTimezone({ long: long, lat: lat });
          const { gmtOffset, countryName } = data;

          setTimezoneData({
            timezone: timezoneSecondsToHours(gmtOffset),
            countryName: countryName === "" ? "somewhere remote" : countryName,
          });
        } catch (err) {
          console.error(">>>> ", err);
        }
      }
    };

    fetchTimezone();
  }, [lat, long]);

  return (
    <div className="App">
      <Box
        style={{
          justifyContent: "center",
          padding: "5em",
          flexDirection: "column",
          alignItems: "center",
          width: "25%",
        }}
      >
        <NumberInput
          name="Latitude"
          min={-90}
          max={90}
          step={0.1}
          debounce={300}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLat(Number(e.target.value));
          }}
        />
        <NumberInput
          name="Longitude"
          min={-180}
          max={180}
          step={0.1}
          debounce={300}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLong(Number(e.target.value));
          }}
        />
      </Box>

      <Box style={{ justifyContent: "center" }}>
        {lat && long && timezoneData
          ? `Your timezone for ${
              timezoneData.countryName
            } is ${timezoneData.timezone.toFixed(2)}`
          : "Please enter you position"}
      </Box>
    </div>
  );
}

export default App;
