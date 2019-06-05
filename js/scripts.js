var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  var searchBar = document.querySelector('#search-bar');
  searchBar.addEventListener("input", filterPokemon);

  function filterPokemon(e) {
    var text = e.target.value.toLowerCase();
    document.querySelectorAll('.pokemon-list__item').forEach(function (listItem) {
      var item = listItem.firstChild.textContent;
      if( item.toLowerCase().indexOf(text) === -1) {
        listItem.style.display = 'none';
      }
    });
  }

  function add(pokemon) {
    if (typeof pokemon === "object" /*&& Object.keys(pokemon) === ['name', 'height', 'types']*/) {
      repository.push(pokemon);
    } else {
      return 'error';
    }
  }
 
  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    var $list = document.querySelector('.pokemon-list');
    var $listItem = document.createElement('li');
    var $button = document.createElement('button');
    $listItem.classList.add('pokemon-list__item');
    $button.classList.add('pokemon-list__button');

    $button.innerText = pokemon.name;
    
    $listItem.appendChild($button);
    $list.appendChild($listItem);
    $button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();  
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details) { 
      console.log(details);

      //Now add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    repository: repository
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
