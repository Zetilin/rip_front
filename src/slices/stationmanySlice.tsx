import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Station } from '../modules/NuclearApi'
import { api } from '../api'

interface StationsState {
    stations: Station[];
    error: string | null;
}
  
const initialState: StationsState = {
    stations: [],
    error: null
};

export const getStations = createAsyncThunk(
    'station/getStations',
    async () => {
        const response = await api.stations.getStationsList();
        return response.data;
    }
);

export const getStationsFiltered = createAsyncThunk(
    'station/getStationsFiltered',
    async ({ date_formation_start, date_formation_end, status }: { date_formation_start: string; date_formation_end: string; status: number }) => {
        const response = await api.stations.getStationsList({ date_formation_start: date_formation_start, date_formation_end: date_formation_end, status: status });
        return response.data;
    }
);

export const moderateStation = createAsyncThunk(
    'station/moderateStation',
    async ({ station_id, status }: { station_id: string; status: number }) => {
      const response = await api.stations.moderateStation(station_id, {status: status});
      return response.data;
    }
  );

const stationmanySlice = createSlice({
    name: 'Stations',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setStationsData: (state, action) => {
            state.stations = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStations.fulfilled, (state, action) => {
                state.stations = action.payload; // Сохраняем данные из API
            })
            .addCase(getStations.rejected, (state, action) => {
                state.error = action.error.message || 'Ошибка при загрузке данных';
            })
            .addCase(getStationsFiltered.fulfilled, (state, action) => {
                state.stations = action.payload; // Сохраняем данные из API
            })
            .addCase(getStationsFiltered.rejected, (state, action) => {
                state.error = action.error.message || 'Ошибка при загрузке данных';
            })
    }
    });
  
  export const { setError, setStationsData } = stationmanySlice.actions;
  export const stationmanyReducer = stationmanySlice.reducer;