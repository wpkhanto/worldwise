import { createContext, useState, useEffect, useContext } from 'react';
const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert('error');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{ cities, isLoading }}>
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
