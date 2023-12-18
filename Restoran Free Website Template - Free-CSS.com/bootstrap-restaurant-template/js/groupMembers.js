'use strict'

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://yearupdemo.azurewebsites.net/api/users/group/CTRL%20Freaks", requestOptions)
    .then(response => response.json())
    .then(result => {

        let memberCard = ""
        for (let index = 0; index < result.length; index++) {
            const memberId = result[index].ID;
            const codeName = result[index].CodingNickname
            const memberName = result[index].Name;
            const gitProfile = result[index].GitHubProfile;
            const memberEmail = result[index].Email;
            let cardTemplate =
            `
            <div class="row g-4 col-lg-4 col-md-6">
                    <div class=" wow fadeInUp" data-wow-delay="0.1s">
                        <div class="team-item text-center rounded overflow-hidden">
                            <div class="rounded-circle overflow-hidden m-4">
                                <img class="img-fluid" src="https://cdn-icons-png.flaticon.com/512/9706/9706583.png" alt="">
                            </div>
                            <h5 class="mb-0">${memberName}</h5>
                            <h6><br>(${codeName})</h6>
                            <div class="d-flex justify-content-center mt-3">
                                <a class="btn btn-square btn-primary mx-1" href="${gitProfile}" target="_blank"><i class="fab fa-github"></i></a>
                                <a class="btn btn-square btn-primary mx-1" href="mailto:${memberEmail}"><i class="fa fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `

            if (memberId === 2 || memberId === 3 || memberId === 7){
                memberCard += cardTemplate
            }
        }
        document.getElementById('memberCard').innerHTML = memberCard
    })
    .catch(error => console.log('error', error));