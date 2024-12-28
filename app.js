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
const animationDuration = totalSlides * 5; // Modifica 5 para ajustar la velocidad
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

