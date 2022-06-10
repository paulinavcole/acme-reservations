const fetchUsers = async() => {
    const response = await fetch('/api/users');
    return response.json();
};

const fetchRestaurants = async() => {
    const response = await fetch('/api/restaurants');
    return response.json();
};

const fetchReservations = async(id) => {
    const response = await fetch(`/api/users/${id}/reservations`);
    return response.json();
};

module.exports = {
    fetchUsers,
    fetchRestaurants,
    fetchReservations
}