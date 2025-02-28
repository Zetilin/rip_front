export interface Reactor {
    id: number;
    status: number;
    name: string;
    fuel: string;
    description: string;
    image: string;
  }
  export interface ReactorsResult {
    current_station_id: number,
    reactors_quantity: number,
    reactors: Reactor[];
  }

  export const getReactors = async (): Promise<ReactorsResult> => {
    return fetch('/api/api/reactors/').then(
      (response) => response.json()
    );
  };
  
  export const getReactorById = async (
    id: number | string
  ): Promise<ReactorsResult> => {
    return fetch(`/api/api/reactors/${id}/`).then(
      (response) => response.json()
    );
  }; 

  export interface Station {
    "id": number;
    "status": number;
    "owner": number;
    "moderator": string;
    "date_created": Date | null;
    "date_formation": Date | null;
    "date_complete": Date | null;
    "name": string;
    "location": string;
    "year": number;
    "qr": string;
  }