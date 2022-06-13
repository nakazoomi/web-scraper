const feedDisplay = document.querySelector('#feed');

fetch('http://localhost:8000/results')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((article) => {
      const title = `<h3>` + article.title + `</h3>`;
      feedDisplay.insertAdjacentHTML('beforeend', title);
      const time = `<p>` + article.time + `</p>`;
      feedDisplay.insertAdjacentHTML('beforeend', time);
    });
  });
//   .catch((err) => console.log(err));
