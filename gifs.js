
const getGifsElements = (gifsData) => {
  return  gifsData.data.map((gif) => {
    const contenedor = document.createElement("div");
    contenedor.classList.add("col-md-4");
    contenedor.innerHTML = `
        <div class="card mb-4 box-shadow">
        <img
          class="card-img-top"
          src="${gif.images.original.url}"
          alt=" ${gif.slug}"
        />
        <div class="card-body">
          <p class="card-text">
            <a
              href=" ${gif.url}"
            >
              ${gif.title}
            </a>
          </p>
        </div>
      </div>`;
    return contenedor;
  });
};

const botonMostrarGifs = document.querySelector("#mostrarGifs");

const mostrarFotosHandler = async (ev) => {
  ev.preventDefault();

  //Se selecciona el input de la palabra clave
  const keyword=document.querySelector("#keyword").value;

  //Se obtiene el contenedor donde se mostraran los gifs
  const contenedor= document.querySelector(".row.containerGifs");

  //Se limpia el contenedor
  contenedor.innerHTML="";

  //Se obtiene el recurso json añadiendole la palabra clave
  const gifsRespone = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=jHi4wYsUSY6PeGNt3STSH6lOTh0Bq2W7&q=${keyword}&limit=10&offset=0&rating=g&lang=en`
  );

  //Se obtiene la data del json
  const gifsData = await gifsRespone.json();

  //Se determina si la busqueda arroja resultados
  if(gifsData.pagination.total_count==0){
    const divVacio = document.createElement("div");
    divVacio.classList.add("col-md-4");
    divVacio.innerHTML="<div class='alert alert-danger text-center' role='alert'>Esta busqueda no tiene resultados</div>";
    contenedor.appendChild(divVacio);
  }else{
   //Se arma la lista de objetos en html
      const elementosGifs = getGifsElements(gifsData);

    //Se añaden al dom
    elementosGifs.forEach((element) => {
     contenedor.appendChild(element);
     });
  }

  
};

botonMostrarGifs.addEventListener("click", mostrarFotosHandler);
