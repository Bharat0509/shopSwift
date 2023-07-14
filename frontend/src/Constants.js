import axios from 'axios';

export const AxiosClient = axios.create({
    withCredentials: true,
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://tiny-plum-coyote-vest.cyclic.app'
            : 'http://localhost:4000'
});
export const filtersLabels = [
    'Category',
    'Sort By',
    'Rating',
    'Price',
    'More Filters'
];

export const sortByItems = [
    'Popularity',
    'Rating: High to Low',
    'Cost: High to Low',
    'Cost: Low to High'
];

export const categoryItems = [
    { label: 'All', value: '' },
    { label: 'Laptop', value: 'Laptop' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Bottom', value: 'Bottom' },
    { label: 'Tops', value: 'Tops' },
    { label: 'Attire', value: 'Attire' },
    { label: 'SmartPhones', value: 'SmartPhones' }
];
