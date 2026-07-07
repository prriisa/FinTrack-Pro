const form = document.querySelector('form')
const task = document.querySelector('#task')
const taskDisc = document.querySelector('#task-desc')
const category = document.querySelector('.category')
const important = document.querySelector('.important')
const date = document.querySelector('#date')
const taskContainer = document.querySelector('.task-container')
const taskDiv = document.querySelectorAll('.task-div')

let data = (JSON.parse(localStorage.getItem('data')) || [])

function addTask(data) {
    taskContainer.innerHTML = ''
    if (data.length === 0) return
    data.forEach((obj, index) => {
        let dataDiv = document.querySelector(`.data.${obj.category}`);
        if (dataDiv) {
            dataDiv.innerHTML += `
                    <div class="task-div ${obj.date}" data-index="${index}">
                        <div class="checkbox">
                            <div class="checkbox-tick" style="display: ${obj.checkBox ? 'block' : 'none'}"></div>
                        </div>
                        <p style="text-decoration: ${obj.checkBox ? 'line-through' : 'none'}">${obj.task}</p>
                        <div class="description">${obj.discription}</div>
                        <div class="dlt" data-index="${index}"><i class="ri-delete-bin-fill" style="color:rgb(38, 38, 38)"></i></div>
                    </div>`

        } else {
            taskContainer.innerHTML += `
                <div class="data ${obj.category}">
                    <h6>${obj.category}</h6>
                    <div class="task-div ${obj.date}" data-index="${index}">
                        <div class="checkbox">
                            <div class="checkbox-tick ${obj.important}" style="display: ${obj.checkBox ? 'block' : 'none'}"></div>
                        </div>
                        <p style="text-decoration: ${obj.checkBox ? 'line-through' : 'none'}">${obj.task}</p>
                        <div class="description">${obj.discription}</div>
                        <div class="dlt" data-index="${index}"><i class="ri-delete-bin-fill" style="color:rgb(38, 38, 38)"></i></div>
                    </div>
                </div>`
        }
    })

}
addTask(data)

function addDate(data) {

    const dateContainer = document.querySelector(".date-container");
    dateContainer.innerHTML = "";

    const days = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];

    const addedDates = new Set();

    data.forEach((obj) => {

        if (addedDates.has(obj.date)) return;

        addedDates.add(obj.date);

        const inputDate = new Date(obj.date);

        dateContainer.innerHTML += `
            <div class="task-date">
                <h6>${days[inputDate.getDay()]}</h6>
                <h6>${inputDate.getDate()}</h6>
            </div>
        `;
    });
}
addDate(data)

form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (task.value === '' || taskDisc.value === '' || category.value === '' || date.value === '' || important.value === '') {
        alert("Please fill all fields...")
        return
    }

    data.push({
        task: task.value,
        discription: taskDisc.value,
        category: category.value,
        date: date.value,
        checkBox: false,
        important: important.value
    })


    localStorage.setItem('data', JSON.stringify(data));

    addTask(data)

    addDate(data)

    form.reset()

})

taskContainer.addEventListener('click', function (e) {
    let div = e.target.closest('.dlt')
    if (div) {
        let taskIndex = div.dataset.index
        data.splice(taskIndex, 1)
        localStorage.setItem('data', JSON.stringify(data))
        addTask(data)
        addDate(data)
    }

    if (e.target.closest('.checkbox')) {

        const taskDiv = e.target.closest('.task-div');
        const index = Number(taskDiv.dataset.index);

        data[index].checkBox = !data[index].checkBox;

        localStorage.setItem("data", JSON.stringify(data));

        addTask(data);
        addDate(data);
    }
})