import type { Character } from '../types'

export type characterActions =
    | { type: 'SET_CHARACTERS', payload: Character[] }
    | { type: 'ADD_FAVORITE', payload: Character }
    | { type: 'REMOVE_FAVORITE', payload: { id: Character['id'] } }

export type State = {
    characters: Character[]
    favorites: Character[]
}

export const initialState: State = {
    characters: [],
    favorites: [],
}

export function characterReducer(state: State, action: characterActions) {
    switch (action.type) {
        case 'SET_CHARACTERS':
            return { ...state, characters: action.payload }

        case 'ADD_FAVORITE': {
            // evito duplicados
            const exists = state.favorites.some((c) => c.id === action.payload.id)
            if (exists) return state
            return { ...state, favorites: [...state.favorites, action.payload] }
        }

        case 'REMOVE_FAVORITE': {
            const newArray = state.favorites.filter((character) => character.id !== action.payload.id)
            return { ...state, favorites: newArray }
        }

        default:
            return state
    }
}