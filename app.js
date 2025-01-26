const input = document.querySelector('#input')
const button = document.querySelector('button')
const flag = document.querySelector('#img')
const commonName = document.querySelector('#common')
const capital = document.querySelector('#capital')
const population = document.querySelector('#population')
const border = document.querySelector('#border')
const language = document.querySelector('#languages')
let imgBorder = document.querySelector('.img-box')


let updateInfomations = (imgUrl, alt, commName, capitalCity, popula, borderTouch, languages) => {
    flag.src = imgUrl
    flag.alt = alt
    commonName.textContent = `common: ${commName}`
    capital.textContent = `Country Capital: ${capitalCity}`
    population.textContent = `Country Population: ${popula}`
    border.textContent = `Country Borders: ${borderTouch}`
    language.textContent = `Country Languages: ${languages}`
    imgBorder.style.border = 'none'
}

let performSearch = async () => {
    try {
        if (input.value.trim() !== '') {
            const search = input.value.trim();
            const response = await fetch(`https://restcountries.com/v3.1/name/${search}`)

            if (!response.ok) {
                throw new Error('Country not found');
            }

            const countrySearch = await response.json();
            const country = countrySearch[0];
            const languages = country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A';
            updateInfomations(
                country.flags.png,
                country.flags.alt || 'Country Flag',
                country.name.common,
                country.capital ? country.capital.join(', ') : 'N/A',
                country.population.toLocaleString(),
                country.borders ? country.borders.join(', ') : 'No Borders',
                languages
            );
        } else {
            alert('Please enter a country name.');
        }
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

button.addEventListener('click', () => {
    performSearch();

})

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});