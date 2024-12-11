document.getElementById('fetchPokemon').addEventListener('click', async function() {
    const pokemonId = document.getElementById('pokemonId').value;
    const errorMessage = document.getElementById('errorMessage');
    const pokemonCard = document.getElementById('pokemonCard');
    
    // Limpiar cualquier error o tarjeta anterior
    errorMessage.textContent = '';
    pokemonCard.innerHTML = '';
  
    // Validar si se ingresa un número
    if (!pokemonId || isNaN(pokemonId)) {
      errorMessage.textContent = 'Por favor ingresa un número válido de Pokémon.';
      return;
    }
  
    try {
      // Llamar a la PokeAPI para obtener los datos del Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      
      // Si no se encuentra el Pokémon
      if (!response.ok) {
        errorMessage.textContent = 'Pokémon no encontrado. Intenta con otro número.';
        return;
      }
  
      const data = await response.json();
  
      // Crear la tarjeta del Pokémon
      const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const pokemonHeight = (data.height / 10).toFixed(2); // Dividir por 10
      const pokemonWeight = (data.weight / 10).toFixed(2); // Dividir por 10
      const pokemonTypes = data.types.map(type => type.type.name).join(', ');
      const pokemonImage = data.sprites.front_default;
  
      const cardHTML = `
        <div class="card">
          <h2>${pokemonName}</h2>
          <img src="${pokemonImage}" alt="${pokemonName}" />
          <p><strong>Tipo(s):</strong> ${pokemonTypes}</p>
          <p><strong>Altura:</strong> ${pokemonHeight} m</p>
          <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
        </div>
      `;
  
      pokemonCard.innerHTML = cardHTML;
    } catch (error) {
      errorMessage.textContent = 'Hubo un problema al obtener los datos del Pokémon. Intenta más tarde.';
    }
  });
  