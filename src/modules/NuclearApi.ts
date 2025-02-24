export interface Reactor {
    id: number;
    name: string;
    fuel: string;
    description: string;
    img_url: string;
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