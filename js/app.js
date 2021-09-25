const url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,picture,nat,phone&noinfo';
let employees = [];
const grid = document.querySelector(".grid");
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector('.modal-close');

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
            <div class="card" data-index="${index}"</div>
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

function displayModal(index) {
    const {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];
    const date = new Date(dob.date);
    
    const modalHTML = `
        <img class="photo" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
        <div class="modal-text">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="location">${city}</p>
            <hr />
            <p class="tel">${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="birthday">Birthday: 
${date.getMonth()}/${date.getDay()}/${date.getFullYear()}</p>
        </div>
    `
    overlay.classList.remove('hidden');
    modalContent.innerHTML = modalHTML;
}

grid.addEventListener('click', e => {
    if (e.target !== grid) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        
        displayModal(index);
    }
});

modalClose.addEventListener('click', e => {
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', e => {
    if (!overlay.classList.contains('hidden') & e.target.className === 'overlay') {
        overlay.classList.add('hidden');
    }
})