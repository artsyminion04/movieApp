const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')
container.setAttribute('id' , 'cont')

app.appendChild(container)

function submit(){
  document.getElementById('cont').innerHTML = ''
  var request = new XMLHttpRequest()
  var addtoLink = document.getElementById("name").value;
  request.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=089631bbf95b47af012c1f2f3e6336b9&language=en-US&query=%22' + addtoLink + '%22&page=1&include_adult=false', true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.results.forEach((movie) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.textContent = movie.title

        const p = document.createElement('p')
        movie.description = movie.overview.substring(0, 300)
        p.textContent = `${movie.description}...`

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p)

        var img_src = 'https://image.tmdb.org/t/p/w200/' + movie.poster_path;
        
        if (movie.poster_path == null)
        {
          const error = document.createElement('p')
          error.setAttribute('class', 'error')
          error.textContent = 'This movie poster is not available'
          card.appendChild(error)
        }
        else
        {
          const img = document.createElement('img')
          img.src = img_src
          card.appendChild(img)
        }
        })
    }
    else 
    {
      const errorMessage = document.createElement('errorBox')
      errorMessage.textContent = 'Sorry no movies with this title are available. Please search again.'
      app.appendChild(errorMessage)
    }
      }
    request.send()
      
}

 
