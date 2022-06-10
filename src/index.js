const api = require('./api');
const {fetchUsers, fetchRestaurants, fetchReservations} = api

const usersList = document.querySelector('#users-list')
const restaurantsList = document.querySelector('#restaurants-list')
const reservationsList = document.querySelector('#reservations-list')

let users;
let restaurants;

const bootstrap = async() => {
    const results = await Promise.all([
        fetchUsers(),
        fetchRestaurants()
    ]);

    users = results[0];
    restaurants = results[1];
    renderUsers();
    html = restaurants.map(restaurants => {
        return `
        <li>
            ${restaurants.name}
        </li>
       `;
    }).join('')
    restaurantsList.innerHTML = html
    renderReservations();
};

const renderReservations = async() => {
    const hash = window.location.hash.slice(1);
    const reservations = await fetchReservations(hash);
    const html = reservations.map(reservation =>  {
        return `
            <li>
                ${reservation.id}
            </li>
        `
    }).join('')
    reservationsList.innerHTML = html
};

const renderUsers = ()=> {
    const hash = window.location.hash.slice(1);
    let html = users.map( user => {
      return `
        <li ${ hash*1 === user.id ? "class='selected'":''}>
          <a href='#${user.id}'>
            ${ user.name }
          </a>
        </li>
      `;
    }).join('');
    usersList.innerHTML = html;
  };


window.addEventListener('hashchange', () => {
    renderReservations();
    renderUsers();
});
bootstrap()

