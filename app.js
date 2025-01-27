const input = document.querySelector('#input');
const flag = document.querySelector('#img');
const commonName = document.querySelector('#common');
const capital = document.querySelector('#capital');
const population = document.querySelector('#population');
const border = document.querySelector('#border');
const language = document.querySelector('#languages');
const imgBorder = document.querySelector('.img-box');
const loader = document.querySelector('.loader');
const infoBox = document.querySelector('.info-box');
const errorMessage = document.createElement('p'); // Create a new element for error message
errorMessage.style.color = 'red'; // Style the error message
infoBox.appendChild(errorMessage); // Append the error message to the info box

// Helper Functions
const updateInformations = (imgUrl, alt, commName, capitalCity, popula, borderTouch, languages) => {
  // Hide error message if data is found
  errorMessage.textContent = '';
  
  // Display country information
  flag.src = imgUrl;
  flag.alt = alt;
  commonName.textContent = `Common: ${commName}`;
  capital.textContent = `Country Capital: ${capitalCity}`;
  population.textContent = `Country Population: ${popula}`;
  border.textContent = `Country Borders: ${borderTouch}`;
  language.textContent = `Country Languages: ${languages}`;
  imgBorder.style.border = 'none';
};

const showLoader = () => {
  loader.style.display = 'block';
  infoBox.style.visibility = 'hidden'; // Hide info box while loading
  errorMessage.textContent = ''; // Clear any previous error messages
};

const hideLoader = () => {
  loader.style.display = 'none';
  infoBox.style.visibility = 'visible'; // Show info box after loading
};

const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z\s]/g, '').trim();
};

// Real-time Search Functionality
const performSearch = async (search) => {
  try {
    if (search) {
      showLoader();
      const response = await fetch(`https://restcountries.com/v3.1/name/${search}`);

      if (!response.ok) {
        throw new Error('Country not found');
      }

      const countrySearch = await response.json();
      const country = countrySearch[0];
      const languages = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';

      updateInformations(
        country.flags.png,
        country.flags.alt || 'Country Flag',
        country.name.common,
        country.capital ? country.capital.join(', ') : 'N/A',
        country.population.toLocaleString(),
        country.borders ? country.borders.join(', ') : 'No Borders',
        languages
      );
    }
  } catch (error) {
    console.error('Error fetching country data:', error);

    // Display appropriate error message
    if (error.message === 'Country not found') {
      errorMessage.textContent = 'No country found with that name. Please try again.';
    } else {
      errorMessage.textContent = 'There was a network error. Please try again later.';
    }

    // Clear country information if there is an error
    flag.src = '';
    commonName.textContent = '';
    capital.textContent = '';
    population.textContent = '';
    border.textContent = '';
    language.textContent = '';
  } finally {
    hideLoader();
  }
};

// Event Listener for Real-time Search
input.addEventListener('input', (e) => {
  const search = sanitizeInput(e.target.value);
  performSearch(search);
});
