var pokemonRepository = (function () {
  var repository = [
    { name: 'Wartorle', height: 1, types: ['water'] },
    { name: 'Nidorino', height: 0.9, types: ['poison'] },
    { name: 'Oddish', height: 0.5, types: ['grass', 'poison'] },
    { name: 'Infernape', height: 1.2, types: ['fire', 'fighting'] },
    { name: 'Hypno', height: 1.6, types: ['psychic'] }
  ];

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

    pokemon.types.forEach(function (type) {
      $button.classList.add(type);
    })

    $button.innerText = pokemon.name;
    
    $listItem.appendChild($button);
    $list.appendChild($listItem);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.4, types: ['electric'] });

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
