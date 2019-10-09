
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$('#escribe_reseña').on('click', function(event){
  let $commentSection = $('#seccion_comentario')
  $commentSection.toggle('hidden')
})



/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
//falta que se load bien los comments
//que se agregue clase de reviews a newHTML
$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function(data){
    let newHTML = ''
    $(data).find('comment').each(function(){
      newHTML += `
        <h2 class="nombre">
          ${$(this).find('name').text()}
        </h2>
        <h5 class="review">
          ${$(this).find('text').text()}
        </h5>`
    })
    $('#seccion_reviews').append(newHTML)
  },
  error: function(errorMsg){
    console.log(errorMsg)
  },
})



/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$('#btn-publicar').on( "click",function(){
  let $name = $('#nombre').text()
  let $comment = $('#comentario').text()

  if($name.val() != "" || $comment.val() != ""){
    let newHTML = `
      <h2 class="nombre">
        ${$(name)}
      </h2>
      <h5 class="review">
        ${$(comment)}
      </h5>`
    $(document).find('#seccion_reviews').append(newHTML)

    let $name = $('#nombre')
    $name.val('')
    let $email = $('#email')
    $email.val('')
    let $comment = $('#comentario')
    $comment.empty()
  }
  // else{
  //   $('#error_comment').removeClass("error")
  // }
});



/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').on( "click",function(){
  let $name = $('#nombre')
  $name.val('')
  let $email = $('#email')
  $email.val('')
  let $comment = $('#comentario')
  $comment.empty()
});


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function(data){
    let stars = $(data).find('stars')
    getStarsSpans(stars)
    $('h2').append(new_html)
  },
  error:function(data){
    console.log(errorMsg)
  },
})

//input[name='rating']:checked

function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
