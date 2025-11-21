import React, { createContext, useReducer, type ReactNode } from 'react'
import { initialState, type State, type characterActions, characterReducer } from '../reducers/charactersReducer'

type CharacterContextProps = {
  state: State
  dispatch: React.Dispatch<characterActions>
}

type CharacterProviderProps = {
  children : ReactNode
}

export const CharactersContext = createContext<CharacterContextProps>(null!)

export const CharacterProvider = ({children} : CharacterProviderProps) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharactersContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}
