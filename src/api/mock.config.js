import MockAdapter from "axios-mock-adapter";
import { truckData } from "./mockData";

export const initializeAxiosMockAdapter = instance => {
  const mock = new MockAdapter(instance);
  mock.onGet("/trucks").reply(() => getAllTrucks());
  mock.onGet(/\/trucks\/\d+/).reply(config => getTruckById(config));
  mock.onPost("/trucks").reply(config => addTruck(config));
  mock.onPut(/\/trucks\/\d+/).reply(config => updateTruckStatus(config));
  mock.onDelete(/\/trucks\/\d+/).reply(config => removeTruck(config));
};

export const getAllTrucks = () => {
  return [200, truckData];
};

export const getTruckById = config => {
  const id = extractIdPathParamFromUrl(config);
  const truck = truckData.find(c => c.id === id);
  return [200, truck];
};

const extractIdPathParamFromUrl = config => {
  return config.url.split("/").pop();
};

export const addTruck = config => {
  const truck = JSON.parse(config.data);
  truckData.push(truck);
  return [200, truck];
};

export const updateTruckStatus = config => {
  const id = extractIdPathParamFromUrl(config);
  const truckIndex = truckData.findIndex(c => c.id === id);
  const truck = JSON.parse(config.data);
  truckData[truckIndex] = truck;
  return [200, truck];
};

export const removeTruck = config => {
  const id = extractIdPathParamFromUrl(config);
  truckData = truckData.filter(c => c.id !== id);
  return [204, null];
};
