let phoneNumber = '';
let whatsappNumber = '';

// Abrir el modal
document.getElementById('openModalBtn').addEventListener('click', () => {
  document.getElementById('modal-fondo').style.display = 'block';  // Mostrar el fondo
  document.getElementById('actionModal').style.display = 'block';  // Mostrar el modal
});

// Cerrar el modal con el botón de cierre
document.getElementById('closeModalBtn').addEventListener('click', () => {
  document.getElementById('modal-fondo').style.display = 'none';  // Ocultar el fondo
  document.getElementById('actionModal').style.display = 'none';  // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera del contenido del modal
document.getElementById('modal-fondo').addEventListener('click', (event) => {
  if (event.target === document.getElementById('modal-fondo')) {
    document.getElementById('modal-fondo').style.display = 'none';  // Ocultar el fondo
    document.getElementById('actionModal').style.display = 'none';  // Ocultar el modal
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos desde el archivo JSON
  fetch('config.json')
    .then(response => response.json())
    .then(data => {
      // Obtener los datos de los números y la sección de contacto
      const whatsappNumber = data.whatsappNumber;
      const phoneNumber = data.phoneNumber;

      // Función para validar las URL
      function isValidURL(url) {
        const regex = /^(https?:\/\/)?([a-z0-9]+[.])*[a-z0-9]+\.[a-z]{2,6}([\/\w .-]*)*\/?$/;
        return regex.test(url);
      }

      // Función para validar los números de teléfono
      function isValidPhoneNumber(number, type) {
        const phoneRegex = /^[0-9]{11}$/;  // Validación para teléfono (11 dígitos)
        const whatsappRegex = /^[0-9]{13}$/;  // Validación para WhatsApp (13 dígitos)

        if (type === 'phone') {
          return phoneRegex.test(number);
        } else if (type === 'whatsapp') {
          return whatsappRegex.test(number);
        }
        return false;
      }

      // Función para redirigir al usuario a WhatsApp
      function redirigirWhatsapp() {
        if (isValidPhoneNumber(whatsappNumber, 'whatsapp')) {
          window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        } else {
          console.error('Número de WhatsApp no válido');
        }
      }

      // Función para redirigir al usuario a realizar una llamada
      function redirigirLlamada() {
        if (isValidPhoneNumber(phoneNumber, 'phone')) {
          window.location.href = `tel:${phoneNumber}`;
        } else {
          console.error('Número de teléfono no válido');
        }
      }

      // Agregar los eventos de los enlaces
      document.getElementById('whatsappLink').addEventListener('click', (event) => {
        event.preventDefault();
        redirigirWhatsapp();
      });

      document.getElementById('callLink').addEventListener('click', (event) => {
        event.preventDefault();
        redirigirLlamada();
      });

      // Cerrar el modal al hacer clic en "Ir a Contacto"
      document.getElementById('contactoLink').addEventListener('click', () => {
        document.getElementById('modal-fondo').style.display = 'none';  // Ocultar el fondo
        document.getElementById('actionModal').style.display = 'none';  // Ocultar el modal
      });

    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
  
window.addEventListener("scroll",function(){
  let header = document.querySelector("header");
  header.classList.toggle("abajo",window.scrollY>0)

})

//Slider clientes
// Selección del contenedor y track
const sliderTrack = document.querySelector('.slider-clientes-track');
const slides = Array.from(sliderTrack.children);

// Duplicamos los elementos para crear el efecto infinito
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    sliderTrack.appendChild(clone);
});

// Ajustamos el ancho del track dinámicamente
const totalSlides = sliderTrack.children.length;
const slideWidth = slides[0].offsetWidth + 20; // Incluyendo margen
sliderTrack.style.width = `${totalSlides * slideWidth}px`;

// Ajustar la duración de la animación basada en el número de imágenes
const animationDuration = totalSlides * 1; // Modifica 5 para ajustar la velocidad
sliderTrack.style.animationDuration = `${animationDuration}s`;

//navbar
 // Obtener todos los enlaces de navegación
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Obtener el elemento del colapso (el menú desplegable)
const navbarCollapse = document.getElementById('navbarSupportedContent');

// Agregar un evento de clic a cada enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cerrar el menú
        const collapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false // No vuelve a abrir el menú
        });
        collapse.hide(); // Cierra el menú
    });
});

//SLIDER

let list = document.querySelector('.container-slider .wrapper-slider');
let items = document.querySelectorAll('.container-slider .wrapper-slider .wrapper-slider-item');
let dots = document.querySelectorAll('.container-slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0
let lengthItems = items.length - 1;

let isTransitioning = false;

next.onclick = function(){
  if(active + 1 > lengthItems){
    active = 0;
}else{
  active = active + 1;
}
reloadSlider();
}

prev.onclick = function(){
  if(active -1 < 0){
    active = lengthItems;
  }else {
    active = active - 1;
  }
  reloadSlider();
}

let refreshSlider = setInterval(() => {next.click()}, 4000);

function reloadSlider() {
  if (isTransitioning) return; // Evita ejecutar esta función si una transición ya está en progreso
  isTransitioning = true;

  let checkLeft = items[active].offsetLeft;

  // Iniciar la transición de la imagen
  list.style.transition = "transform 1s ease-in-out";
  list.style.transform = `translateX(-${checkLeft}px)`;

  // Desactivar las animaciones previas
  items.forEach((item) => {
    const textElement = item.querySelector("h2");
    textElement.classList.remove("animate__fadeInUp");
    textElement.style.opacity = "0";
  });

  // Escuchar el evento de finalización de la transición
  list.addEventListener(
    "transitionend",
    () => {
      const activeItem = items[active];
      const activeText = activeItem.querySelector("h2");
      activeText.classList.add("animate__fadeInUp");
      activeText.style.opacity = "1";

      // Restablecer el estado para permitir nuevas transiciones
      isTransitioning = false;
    },
    { once: true }
  );

  // Actualizar los dots activos
  let lastActiveDot = document.querySelector(".container-slider .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");

  // Reiniciar el intervalo del slider automático
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 4000);
}

dots.forEach((li, key) => {
  li.addEventListener('click', function(){
    active = key;
    reloadSlider();
  })
});

window.addEventListener('resize', reloadSlider);