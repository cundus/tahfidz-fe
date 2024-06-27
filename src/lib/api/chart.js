import moment from "moment";
import API from ".";

const tahun = moment().format("YYYY");

export const getChart = async () => {
  return (await API.get(`/chart?year=${tahun}`)).data;
};