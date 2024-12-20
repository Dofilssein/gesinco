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
        const contactSection = data.contactSection;
  
        // Función para validar las URL
        function isValidURL(url) {
          const regex = /^(https?:\/\/)?([a-z0-9]+[.])*[a-z0-9]+\.[a-z]{2,6}([\/\w .-]*)*\/?$/;
          return regex.test(url);
        }
  
        // Función para validar los números de teléfono
        function isValidPhoneNumber(number) {
          const phoneRegex = /^[0-9]{11}$/;
          return phoneRegex.test(number);
        }
  
        // Función para redirigir al usuario
        function redirigirWhatsapp() {
          if (isValidPhoneNumber(whatsappNumber)) {
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
          } else {
            console.error('Número de WhatsApp no válido');
          }
        }
  
        function redirigirLlamada() {
          if (isValidPhoneNumber(phoneNumber)) {
            window.location.href = `tel:${phoneNumber}`;
          } else {
            console.error('Número de teléfono no válido');
          }
        }
  
        function redirigirContacto() {
          if (isValidURL(contactSection)) {
            window.location.href = contactSection;  // Redirigir a la sección de contacto
          } else {
            console.error('URL de contacto no válida');
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
  
        document.getElementById('contactLink').addEventListener('click', (event) => {
          event.preventDefault();
          redirigirContacto();
        });
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
  });
  
