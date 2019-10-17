function check() {
  if (document.getElementById("radio1").checked) {
    return document.getElementById("radio1").value;
  } else {
    return document.getElementById("radio2").value;
  }
}

class Task {
  constructor(Name, Priority) {
    this.Name = Name;
    this.Priority = Priority;
  }
}

class Store {
  static getTasks() {
    let Tasks;

    if (localStorage.getItem("Tasks") === null) {
      Tasks = [];
    } else {
      Tasks = JSON.parse(localStorage.getItem("Tasks"));
    }

    return Tasks;
  }

  static addTask(task) {
    const Tasks = Store.getTasks();

    Tasks.push(task);

    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  }

  static removeTask(name) {
    const Tasks = Store.getTasks();

    Tasks.forEach((task, index) => {
      if (task.Name === name) {
        Tasks.splice(index, 1);
      }
    });

    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  }
}

class U_Interface {
  static Display() {
    const Tasks = Store.getTasks();

    Tasks.forEach(task => U_Interface.add_Task(task));
  }

  static clearFields() {
    document.getElementById("taskName").value = "";
    document.getElementById("radio1").checked = true;
    document.getElementById("req").innerHTML = "";
  }

  static add_Task(task) {
    const list = document.querySelector("#Task-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${task.Name}</td>
        <td>${task.Priority}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete Task</a></td>`;

    list.appendChild(row);
  }

  static delete_Task(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}

document.addEventListener("DOMContentLoaded", U_Interface.Display);

document.querySelector("#addTask").addEventListener("click", e => {
  e.preventDefault();
  // geting the values
  const name = document.getElementById("taskName").value;
  if (name == "") {
    document.getElementById("req").innerHTML = "Required Field";
    return;
  }
  const priority = check();

  const task = new Task(name, priority);

  U_Interface.add_Task(task);
  Store.addTask(task);

  console.log(task);

  U_Interface.clearFields();
});

document.querySelector("#Task-list").addEventListener("click", e => {
  U_Interface.delete_Task(e.target);

  Store.removeTask(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );
});
