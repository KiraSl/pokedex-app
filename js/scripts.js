var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === "object") {
      repository.push(pokemon);
    }
  }
 
  function getAll() {
    return repository;
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

      // add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
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
      showModal(item.name, item.height);
    });
  }

  var $modalContainer = document.querySelector('#modal-container');

  function showModal(title, text) {

    // Clear all existing modal content 
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    //Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h2');
    titleElement.innerText = title; 

    var contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    $modalContainer.appendChild(modal);
  
    $modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }
  
  // Close modal on pressing Esc button
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //Close modal on pressing outside the main modal box 
  $modalContainer.addEventListener('click', (e) => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  // Search bar 
  var searchBar = document.querySelector('#search-bar');
  searchBar.addEventListener("input", filterPokemon);

  function filterPokemon(e) {
    var text = e.target.value.toLowerCase();
    document.querySelectorAll('.pokemon-list__item').forEach(function (listItem) {
      var item = listItem.firstChild.textContent;
      if( item.toLowerCase().indexOf(text) === -1) {
        listItem.style.display = 'none';
      } else {
        listItem.style.display = '';
      }
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

