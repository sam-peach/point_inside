import axios from "axios";
import { Position } from "../types";

export const getTimezone = async (
  pos: Position
): Promise<{ data: { gmtOffset: number; zoneName: string } }> => {
  const queryString = buildQueryString(pos);
  return axios.get(`${process.env.REACT_APP_TIMEZONE_ENDPOINT}?${queryString}`);
};

const buildQueryString = ({ lat, long }: Position): string => {
  return `key=${process.env.REACT_APP_TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${long}`;
};
