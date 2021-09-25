fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => createEmployeeDirectory(data.results))

function createEmployeeDirectory(employees) {
    employees.forEach(employee => {
        createCard(employee);
    });
}

function createCard(employee) {
    function createDiv(htmlClass) {
        const div = document.createElement("div");
        div.classList = htmlClass;
        return div;
    }
    function createPhoto(employee) {
        const photo = document.createElement("img");
        photo.src = employee.picture.medium;
        photo.alt = `Photo of ${employee.name.first} ${employee.name.last}`;
        photo.classList = "photo";
        return photo;
    }
    function createH2(employee, htmlClass) {
        const h2 = document.createElement("h2");
        h2.classList = htmlClass;
        h2.innerHTML = `${employee.name.first} ${employee.name.last}`;
        return h2;
    }
    function createP(htmlClass, innerHTML) {
        const p = document.createElement("p");
        p.classList = htmlClass;
        p.innerHTML = innerHTML;
        return p;
    }
    const grid = document.querySelector(".grid");
    const card = createDiv("card");
    const photo = createPhoto(employee);
    const employeeInfo = createDiv("employee-info");
    const name = createH2(employee, "name");
    const email = createP("email", employee.email);
    const location = createP("location", employee.location.city);

    grid.appendChild(card);
    card.appendChild(photo);
    card.appendChild(employeeInfo);
    employeeInfo.appendChild(name);
    employeeInfo.appendChild(email);
    employeeInfo.appendChild(location);
}