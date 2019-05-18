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

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.4, types: ['electric'] });
console.log(pokemonRepository.getAll());

repository.forEach(function(element) {
  document.write(`<h3>${element.name}</h3>` + `<p>height: ${element.height}, types: ${element.types}</p>`);
});

