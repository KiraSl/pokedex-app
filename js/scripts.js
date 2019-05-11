var repository = [
  { name: 'Wartorle', height: 1, types: ['water'] },
  { name: 'Nidorino', height: 0.9, types: ['poison'] },
  { name: 'Oddish', height: 0.5, types: ['grass', 'poison'] },
  { name: 'Infernape', height: 1.2, types: ['fire', 'fighting'] },
  { name: 'Hypno', height: 1.6, types: ['psychic'] }
];

for (var i = 0; i < repository.length; i++) {
  repository[i].height > 1.2 ? document.write(repository[i].name + " (height: " + repository[i].height + ") - Wow, that’s big! ") : document.write(repository[i].name + " (height: " + repository[i].height + "); ");
}

