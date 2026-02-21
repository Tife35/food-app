// FORMATTING ABD OUTPUTTING NUMBERS AS CURRENCY
export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});