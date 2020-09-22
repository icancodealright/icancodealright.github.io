const main = document.getElementById('main');

async function getUser(username) {

    let responseData = await fetch(`https://api.github.com/users/${username}`);
    let data = await responseData.json();
    createUserProfile(data);
}

async function getUserRepo(username) {
    let repolist = await fetch(`https://api.github.com/users/${username}/repos`);
    let userRepo = await repolist.json()
    createUserRepo(userRepo);
}

function createUserProfile(userData) {
    const profile = `<div class="user__avatar">
                         <img src="${userData.avatar_url}" alt="user_image">   
                    </div>
                    <div class="user__name">
                        <h2>${userData.login}</h2>
                    </div>
                    <div class="user__location">
                        <h3><i class="fa fa-location-arrow"></i> ${userData.location}</h3>
                    </div>
                    <div class="user__bio">
                        <p>${userData.bio}</p>
                    </div>
                    <div class="user__generaldata">
                         <div class="user__followers">
                             ${userData.followers}<span>Followers</span>
                         </div>
                         <div class="user__following">
                             ${userData.following}<span>Following</span>
                         </div>
                         <div class="user__repos">
                             ${userData.public_repos}<span>repo</span>
                           </div>
                        </div>
                        <div class="blog">
                            <div class="blog__url">
                                <span>Blog :${userData.blog}</span>
                            </div>
                        <div id="user__repos">
                        </div>
                    </div> `;
    main.innerHTML = profile;
    getUserRepo(userData.login);
}


function createUserRepo(repos) {
    const repoDiv = document.getElementById('user__repos');
    repos.forEach(repo => {
        const aTag = document.createElement('a');
        aTag.href = repo.html_url;
        aTag.innerText = repo.name;
        aTag.target = '_blank';
        repoDiv.appendChild(aTag);
    });
}

const submitButton = document.getElementById('form__search__submit');
const search = document.getElementById('form__search__input');
submitButton.addEventListener('click', (e) => {
    const searchText = search.value;
    getUser(searchText);
    search.value = "";
})