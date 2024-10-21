// Simulated user data
const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinedDate: '2024-01-15'
};

// Simulated news data
const newsData = [
    { title: 'Breaking News: AI Revolution', date: '2024-09-15', category: 'Technology', source: 'TechCrunch' },
    { title: 'Global Markets Surge', date: '2024-09-14', category: 'Finance', source: 'Bloomberg' },
    { title: 'Climate Change Summit Highlights', date: '2024-09-13', category: 'Environment', source: 'National Geographic' },
    { title: 'Latest in Health Research', date: '2024-09-12', category: 'Health', source: 'WebMD' },
    { title: 'Election 2024 Updates', date: '2024-09-11', category: 'Politics', source: 'Reuters' },
    { title: 'Climate Change Summit Highlights', date: '2024-09-11', category: 'Politics', source: 'Reuters' },
    
];

// Populate user data dynamically
document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.querySelector('#userTable tbody');
    const userRow = document.createElement('tr');
    
    userRow.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.joinedDate}</td>


    `;
    
    userTableBody.appendChild(userRow);

    // Populate news data dynamically
    const newsTableBody = document.querySelector('#newsTable tbody');
    
    newsData.forEach(news => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${news.title}</td>
            <td>${news.date}</td>
            <td>${news.category}</td>
            <td>${news.source}</td>
        `;
        
        newsTableBody.appendChild(row);
    });
});
