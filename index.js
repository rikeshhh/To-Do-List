let formVal = document.querySelector("form");
formVal.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userInput = document.getElementById("userInput").value;

  const data = {
    userInput: userInput,
    date: new Date().toLocaleDateString('en'),
    time: new Date().toLocaleTimeString('en')
  };

  if (userInput == "") {
    alert("inputfield cant be empty");
  } else {
    try {
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

const result = document.getElementById("myUnorderdList");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/data");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    data.forEach((item) => {
      const listItem = document.createElement("li");
      const dateEnlist = document.createElement('span');
      const timeEnlist = document.createElement('span');
      dateEnlist.textContent = item.date;
      timeEnlist.textContent = item.time;
      listItem.classList.add("list");
      const deleteButton = document.createElement("button");
      const editButton = document.createElement('button');
      editButton.textContent ="Edit"
      deleteButton.innerHTML ="<i class='fa-solid fa-delete-left'></i>"
      deleteButton.classList.add("deleteButton");
      editButton.classList.add('editButton')
      deleteButton.addEventListener("click", () => deleteData(item.id));
     editButton.addEventListener('click',()=>editData(item.id));
      listItem.textContent = item.userInput;
      listItem.appendChild(dateEnlist)
      listItem.appendChild(timeEnlist)
      let parerntButton = document.createElement('div')
      parerntButton.classList.add('parentButton')
      parerntButton.appendChild(deleteButton)
      parerntButton.appendChild(editButton)
      listItem.appendChild(parerntButton);
  
      result.appendChild(listItem);
      userInput.value = "";
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteData(itemId) {
  try {
    const deleteResponse = await fetch(`http://localhost:3000/data/${itemId}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      throw new Error("Failed to delete item");
    }

  } catch (error) {
    console.error("Error:", error);
  }
}
async function editData(itemId) {
  try {
    const editResponse = await fetch(`http://localhost:3000/data/${itemId}`, {
      method: "GET",
    });
    const data = await editResponse.json();
   let editUser = prompt("",data.userInput)
   if (editUser == null || editUser == "") {
    text = "User cancelled the prompt.";
  } else {
    data.userInput = editUser;
    const response = await fetch(`http://localhost:3000/data/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  }catch(error){
    console.error("error",error)
  }
  
}
fetchData();


