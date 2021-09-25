const url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,picture,nat,phone&noinfo';
let employees = [];
const grid = document.querySelector(".grid");
const cards = document.getElementsByClassName('card');
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector('.modal-close');
const search = document.querySelector('.search');

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
            <div class="card" data-index="${index}" data-caption="${name.first.toLowerCase()} ${name.last.toLowerCase()}">
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
            <div class="arrows">
                <input type="button" class="arrow left-arrow" value="<"/>
                <hr />
                <input type="button" class="arrow right-arrow" value=">"/>
                </div>
            <p class="tel">${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="birthday">Birthday: 
${date.getMonth()}/${date.getDay()}/${date.getFullYear()}</p>
        </div>
    `
    modalContent.setAttribute('data-index', index);

    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
    }
    
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

search.addEventListener('input', e => {
    const cards = document.querySelectorAll('.card');
    const input = search.value.toLowerCase();
    console.log(input);
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].getAttribute('data-caption').includes(input)) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "flex";
        }
    }
});

document.addEventListener('keydown', e => {
    const modalIndex = parseInt(modalContent.getAttribute('data-index'));
    const prevIndex = modalIndex - 1;
    const nextIndex = modalIndex + 1;
    const cardsLength = cards.length - 1;
    console.log(e.key);
    if (!overlay.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') {
            if (modalIndex === cardsLength) {
                displayModal(0);
            } else {
                displayModal(nextIndex);
            }
        }
        if (e.key === 'ArrowLeft') {
            if (modalIndex === 0) {
                displayModal(cardsLength);
            } else {
                displayModal(prevIndex);
            }
        }
    }
})