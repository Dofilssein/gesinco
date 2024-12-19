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

  