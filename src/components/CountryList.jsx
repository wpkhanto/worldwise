import Message from './Message';
import Spinner from './Spinner';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if (cities.length === 0)
        return (
            <Message message='Add your first city by clicking on a city on the map'></Message>
        );

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem key={country.country} country={country} />
            ))}
        </ul>
    );
}

export default CountryList;
