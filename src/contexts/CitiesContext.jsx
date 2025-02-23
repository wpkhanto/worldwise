import { createContext, useReducer, useEffect, useContext } from 'react';
const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload };
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity: {},
            };
        case 'rejected':
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw Error('Unknown action type ' + action.type);
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        dispatch({ type: 'loading' });
        /*************  ✨ Codeium Command ⭐  *************/
        /**
         * Fetches all cities from the server, and dispatches either 'cities/loaded' or 'rejected' depending on the result.
         */
        /******  c211c9b4-7b0e-432a-bba7-3727d5422977  *******/
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch (error) {
                dispatch({
                    type: 'rejected',
                    payload: 'There was an error loading cities...',
                });
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data });
        } catch (error) {
            dispatch({
                type: 'rejected',
                payload: 'There was an error loading the city...',
            });
        }
    }

    async function createCity(newCity) {
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();

            dispatch({ type: 'city/created', payload: data });
        } catch (error) {
            dispatch({
                type: 'rejected',
                payload: 'There was an error creating the city...',
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: 'loading' });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });

            dispatch({ type: 'city/deleted', payload: id });
        } catch (error) {
            dispatch({
                type: 'rejected',
                payload: 'There was an error deleteing the city...',
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                error,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error('CiteiesContext was used outside the CitiesProvider');
    return context;
}

export { CitiesProvider, useCities };
