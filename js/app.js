const url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,picture,nat,&noinfo';
let employees = [];
const grid = document.querySelector(".grid");

fetch(url)
    .then(response => response.json())
    .then(response => response.results)
    .then(displayEmployeeDirectory)
    .catch(err => console.log(err))

function displayEmployeeDirectory(employeeData) {
    employees = employeeData;

    employeesHTML = '';

    employees.forEach((employee, index) => {
        const picture = employee.picture.large;
        const name = employee.name;
        const email = employee.email;
        const city = employee.location.city;

        employeesHTML += `
            <div class="card" data-index=${index}</div>
                <img class="photo" src=${picture} />
                <div class="employee-info">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="location">${city}</p>
                </div>
            </div>
        `
    });

    grid.innerHTML = employeesHTML;
}

function displayModal(params) {
    
}

grid.addEventListener('click', e => {
    if (e.target !== grid) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        console.log(index);
    }
})