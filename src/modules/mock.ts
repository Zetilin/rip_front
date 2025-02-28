import {ReactorsResult, Reactor} from './NuclearApi'

export const REACTORS_MOCK: ReactorsResult = {
  current_station_id: 0,
  reactors_quantity: 0,
  reactors: [
    {
      id: 1,
      name: 'Нет соединения, повторите позже!',
      fuel: '',
      description: '',
      img_url: '',
    },
  ],
};

export const SOLOREACTOR_MOCK: Reactor = {
  id: 1,
  name: 'Нет соединения, повторите позже!',
  fuel: '',
  description: '',
  img_url: '',
};