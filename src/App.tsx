import { useState, useEffect, ChangeEvent } from "react";
import { getTimezone } from "./timezone_api";
import { NumberInput, Box } from "./components";
import { timezoneSecondsToHours } from "./utils";
import { TimezoneData } from "./types";

function App() {
  const [lat, setLat] = useState<number | null>();
  const [long, setLong] = useState<number | null>();
  const [timezoneData, setTimezoneData] = useState<TimezoneData>();

  useEffect(() => {
    const fetchTimezone = async () => {
      if (lat && long) {
        try {
          const { data } = await getTimezone({ lat: lat, long: long });
          const { gmtOffset, zoneName } = data;

          setTimezoneData({
            timezone: timezoneSecondsToHours(gmtOffset),
            zoneName: zoneName === "" ? "unknown zone" : zoneName,
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
            setLat(parseFloat(e.target.value));
          }}
        />
        <NumberInput
          name="Longitude"
          min={-180}
          max={180}
          step={0.1}
          debounce={300}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setLong(Number(e.target.value));
          }}
        />
      </Box>
      <Box style={{ justifyContent: "center" }}>
        {lat && long && timezoneData
          ? `Your timezone for ${
              timezoneData.zoneName
            } is ${timezoneData.timezone.toFixed(2)}`
          : "Please enter your position"}
      </Box>
    </div>
  );
}

export default App;
