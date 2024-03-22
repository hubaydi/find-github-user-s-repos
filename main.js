const inp = document.querySelector('input[type="text"]');
const btn = document.querySelector('.btn');
const showData = document.querySelector('.data-container');

btn.onclick = function () {
  getApi()
};

function getApi() {
  if (!inp.value) {
    showData.innerHTML = '<span style="color: red; margin: auto; font-size: 18px">Please type the username first</span>'
  } else {
    
    fetch(`https://api.github.com/users/${inp.value}/repos`)
    .then((response) => response.json())
    .then((repos) => {
      
      showData.innerHTML = '';

      repos.forEach((repo) => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';

        const spanName = document.createElement('span');
        spanName.className = 'name'
        spanName.appendChild(document.createTextNode(repo.name))
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        
        repoDiv.append(spanName, infoDiv);
        
        const stars = document.createElement('span');
        stars.className = 'stars';
        stars.appendChild(document.createTextNode(`Stars: ${repo.stargazers_count}`))

        const link = document.createElement('a');
        link.appendChild(document.createTextNode('visit'));
        link.href = `https://github.com/${inp.value}/${repo.name}`;
        link.className = 'visit';

        infoDiv.append(stars, link);

        showData.appendChild(repoDiv);

      })
    })
  }
}