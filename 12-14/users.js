//Classmates

function fetchClassData() {
  const url = "https://yearupdemo.azurewebsites.net/api/users";

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayClassData(data))
    .catch((error) => console.log("Error fetching class data"));
}

function displayClassData(classData) {
  const classDiv = document.getElementById("classData");
  classData.forEach((student) =>
    classDiv.insertAdjacentHTML("beforeend", createStudentCard(student))
  );
}

function createStudentCard(studentData) {
  const card = `
    <div class="card m-3" style="width: 18rem;">
      <img src="${studentData.imageURL}" class="card-img-top" alt="Image of ${studentData.Name}">
      <div class="card-body">
        <h5 class="card-title">${studentData.Name}</h5>
        <p class="card-text"><span class="fw-bold">Email: </span>${studentData.Email}</p>
        <p class="card-text"><span class="fw-bold">Nickname: </span>${studentData.CodingNickname}</p>
        <p class="card-text"><span class="fw-bold">Group: </span>${studentData.Groupname}</p>
        <a href="${studentData.GitHubProfile}" class="btn btn-primary" target="_blank">Github</a>
      </div>
    </div>
  `;
  return card;
}
