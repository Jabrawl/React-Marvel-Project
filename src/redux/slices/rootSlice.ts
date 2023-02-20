import { createSlice } from '@reduxjs/toolkit'

export interface CharState {
    name: string,
    description: string,
    power: string,
    role: string,
    identity: string,
    sidekick: string,
    comic: number,
}


const initialState: CharState = {
    name: 'Captain Iron Panther Lord',
    description: '',
    power: '',
    role: '',
    identity: '',
    sidekick: '',
    comic: 0
}


const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        choosePower: (state, action) => { state.power = action.payload },
        chooseRole: (state, action) => { state.role = action.payload },
        chooseIdentity: (state, action) => { state.identity = action.payload },
        chooseSidekick: (state, action) => { state.sidekick = action.payload },
        chooseComic: (state, action) => { state.comic = action.payload },
    }
})

export const reducer = rootSlice.reducer

export const {
    chooseName,
    chooseDescription,
    choosePower,
    chooseRole,
    chooseIdentity,
    chooseSidekick,
    chooseComic,
} = rootSlice.actions;