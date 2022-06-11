const api = require('./api');
const {fetchUsers, fetchRestaurants, fetchReservations} = api

const usersList = document.querySelector('#users-list')
const restaurantsList = document.querySelector('#restaurants-list')
const reservationsList = document.querySelector('#reservations-list')

let users;
let restaurants;

restaurantsList.addEventListener('click', async(e)=> {
    if(e.target.tagName === 'LI'){
      const restaurantId = e.target.getAttribute('data-id');
      const userId = window.location.hash.slice(1); 
      const url = `/api/users/${userId}/reservations`;
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ restaurantId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      renderReservations();
    }
  });

reservationsList.addEventListener('click', async(e) => {
    if(e.target.tagName === 'LI'){
        const reservationId = e.target.getAttribute('data-id');
        console.log(reservationId)
        const url = `/api/reservations/${reservationId}`;
        await fetch(url, {
            method: 'DELETE',
            headers:  {
                'Content-Type' : 'application/json'
            }
        })
        renderReservations();
    }
});

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
        <li data-id='${restaurants.id}'>
            ${restaurants.name} ${restaurants.id}
        </li>
       `;
    }).join('')
    restaurantsList.innerHTML = html
    renderReservations();
};

const renderReservations = async() => {
    const hash = window.location.hash.slice(1);
    if(hash) {
            const reservations = await fetchReservations(hash);
            const html = reservations.map(reservation =>  {
            const restaurant = restaurants.find(restaurant => restaurant.id === reservation.restaurantId)
            return `
                <li data-id=${reservation.id}>
                    ${restaurant.name}
                </li>
            `
        }).join('')
        reservationsList.innerHTML = html
    }
    else {
        window.location.hash = users[0].id
    }
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

