// import { useState, useEffect } from 'react';

import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
    const {data: loadedMeals, isLoading, error } = useHttp('http://localhost:5000/meals', requestConfig, []);


    if (isLoading) {
        return <p className='center'>Fetching Meals...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />;
    }
    // const [loadedMeals, setLoadedMeals] = useState([]);

    // useEffect(() => {
    //     async function fetchMeals() {
    //         const response = await fetch('http://localhost:5000/meals');

    //         if (!response.ok) {
    //             // ...
    //         }

    //         const meals = await response.json();
    //         setLoadedMeals(meals);
    //     }

    //     fetchMeals();
    // }, []);

    // return (
    //     <ul id='meals'>
    //         {loadedMeals.map((meal) => (
    //             <li key={meal.id} className='meal-item'>
    //                 <article>
    //                     <h2>{meal.name}</h2>
    //                     <img 
    //                     src={meal.image || "https://via.placeholder.com/300x200"} 
    //                     alt={meal.name}
    //                     />
    //                     <p>${meal.price}</p>
    //                 </article>
    //             </li>
    //         ))}

    //     </ul>
    // )

    return (
        <ul id='meals'>
            {loadedMeals.map((meal) => (
                // <li key={meal.id}>{meal.name}</li>
                <MealItem key={meal.id} meal={meal} />
            ))}

        </ul>
    )
}