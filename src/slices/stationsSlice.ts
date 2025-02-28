import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Station, Reactor } from '../modules/NuclearApi'
import { api } from '../api'

interface ReactorStation {
    reactor: Reactor;
}

interface StationState {
    stationData: Station;
    reactorstations: ReactorStation[];
    error: string | null;
    isDraft: boolean;
}

const initialState: StationState = {
    reactorstations: [],
    stationData: {
        id: NaN,
        status: NaN,
        owner: NaN,
        moderator: '',
        date_created: null,
        date_formation: null,
        date_complete: null,
        name: '',
        location: '',
        year: NaN
    },
    error: null,
    isDraft: false
};

export const getStation = createAsyncThunk(
    'station/getStation',
    async(current_station_id: string) => {
        const response = await api.stations.getSingleStation(current_station_id);
        return response.data;
    }
);

export const addReactor = createAsyncThunk(
    'reactors/addReactor',
    async(id: string) => {
        const response = await api.reactors.addSingleReactor(id);
        return response.data;
    }
);

export const deleteStattion = createAsyncThunk(
    'station/deleteStation',
    async(current_station_id: string) => {
        const response = await api.stations.deleteSingleStation(current_station_id);
        return response.data;
    }
);

export const commitStation = createAsyncThunk(
    'station/commitStation',
    async(current_station_id: string) => {
        const response = await api.stations.submitStation(current_station_id);
        return response.data;
    }
);

export const updateStation = createAsyncThunk(
    'station/updateStation',
    async ({current_station_id, stationData} : {current_station_id: string; stationData: Station}) => {
        const stationDataToSend = {
            status: stationData.status,
            owner: String(stationData.owner),
            name: stationData.name ?? '',
            year: stationData.year,
            location: stationData.location ?? '',
        };
        const response = await api.stations.changeSingleStation(current_station_id, stationDataToSend);
        return response.data;
    }
);

export const deleteReactorStation = createAsyncThunk(
    'cities/deleteReactorStation',
    async ({ current_station_id, reactor_id}: {current_station_id: string; reactor_id: number}) => {
        await api.stations.deleteSingleReactorstation(
            current_station_id.toString(),
            reactor_id.toString()
        );
    }
);

export const updateReactorStation = createAsyncThunk(
    'cities/updateReactorStation',
    async ({ current_station_id, reactor_id, ReactorStationData}: {current_station_id: string; reactor_id: number; ReactorStationData: ReactorStation}) => {
        await api.stations.changeSingleReactorstation(
            current_station_id.toString(),
            reactor_id.toString(),
            ReactorStationData.value,
        );
    }
);

const stationSlice = createSlice({
    name: 'Station',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setStationData: (state, action) => {
            state.stationData = {
                ...state.stationData,
                ...action.payload,
            };
        },
        setReactorStation: (state, action) => {
            state.reactorstations = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getStation.fulfilled, (state, action) => {
                state.stationData = action.payload;
                state.reactorstations = action.payload.reactors;

                state.isDraft = state.stationData.status == 1;
            })
            .addCase(getStation.rejected, (state, action) => {
                state.error = action.error.message || 'Ошибка при загрузке данных';
            })
            .addCase(deleteStattion.fulfilled, (state) => {
                state.reactorstations = [];
                state.stationData = {
                    id: NaN,
                    status: NaN,
                    owner: NaN,
                    moderator: '',
                    date_created: null,
                    date_formation: null,
                    date_complete: null,
                    name: '',
                    location: '',
                    year: NaN
                }
            })
            .addCase(deleteStattion.rejected, (state) => {
                state.error = 'Ошибка при удалении станции';
            })
            .addCase(updateStation.fulfilled, (state, action) => {
                state.stationData = action.payload.station;
                state.reactorstations = action.payload.reactors;
                state.isDraft = state.stationData.status == 1;
            })
            .addCase(updateStation.rejected, (state) => {
                state.error = 'Ошибка при обновлении данных';
              })
            .addCase(commitStation.fulfilled, (state) => {
                state.reactorstations = [];
                state.stationData = {
                    id: NaN,
                    status: NaN,
                    owner: NaN,
                    moderator: '',
                    date_created: null,
                    date_formation: null,
                    date_complete: null,
                    name: '',
                    location: '',
                    year: NaN
                }
            })
            .addCase(commitStation.rejected, (state) => {
                state.error = 'Ошибка при удалении вакансии';
              })
              .addCase(updateReactorStation.rejected, (state) => {
                state.error = 'Ошибка при обновлении данных';
              })
    }
});

export const { setError, setStationData, setReactorStation } = stationSlice.actions;
export const stationsReducer = stationSlice.reducer;