

fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    const urls = datos.results.map((pokemon) => pokemon.url);
    return Promise.all(
      urls.map((url) => fetch(url).then((respuesta) => respuesta.json()))
    );
  })
  .then((pokemones) => {
    const tarjetasDiv = document.getElementById("tarjetas-pokemon");

    for (let i = 0; i < pokemones.length; i++) {
      const nombre = pokemones[i].name;
      const imagenUrl = pokemones[i].sprites.front_default;

      const tarjeta = document.createElement("div");
      tarjeta.classList.add("card");

      const imagen = document.createElement("img");
      imagen.src = imagenUrl;
      imagen.alt = `Imagen de ${nombre}`;

      const titulo = document.createElement("h2");
      titulo.textContent = nombre;

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(titulo);
      tarjetasDiv.appendChild(tarjeta);
    }
    document.querySelector("#botonesPagina").innerHTML += `
    <button class="btn btn-primary" onclick="buscarPersonaje('${list.info.prev}')" type="button" id="botonPrev">Prev</button>
    <button class="btn btn-primary" type="button" onclick="buscarPersonaje('${list.info.next}')"  id="botonNext">Next</button>
`
  })
  .catch((error) => console.error(error));