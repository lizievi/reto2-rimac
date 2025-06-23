document.addEventListener('DOMContentLoaded', () => {
  // Manejo de la funcionalidad expandir/colapsar
  // Ahora seleccionamos ambos tipos de botones de toggle
  const toggleButtons = document.querySelectorAll('.toggle-content-btn, .toggle-arrow-btn');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.setting-item');
      if (!parentItem) return;

      const content = parentItem.querySelector('.setting-expandable-content');
      if (!content) return;

      let isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Colapsar
        content.classList.add('collapsed');
        button.setAttribute('aria-expanded', 'false');

        // Actualizar texto/flecha para el botón móvil
        if (button.classList.contains('mobile-only')) {
          button.textContent = 'VER MÁS';
          const arrow = document.createElement('span');
          arrow.classList.add('arrow-icon', 'mobile-arrow');
          button.appendChild(arrow);
        } else if (button.classList.contains('desktop-only')) {
          // Actualizar la flecha para el botón desktop
          const arrowIcon = button.querySelector('.desktop-arrow');
          if (arrowIcon) {
              arrowIcon.classList.remove('up');
              arrowIcon.classList.add('down');
          }
        }

      } else {
        // Expandir
        content.classList.remove('collapsed');
        button.setAttribute('aria-expanded', 'true');

        // Actualizar texto/flecha para el botón móvil
        if (button.classList.contains('mobile-only')) {
          button.textContent = 'VER MENOS';
          const arrow = document.createElement('span');
          arrow.classList.add('arrow-icon', 'mobile-arrow');
          button.appendChild(arrow);
        } else if (button.classList.contains('desktop-only')) {
          // Actualizar la flecha para el botón desktop
          const arrowIcon = button.querySelector('.desktop-arrow');
          if (arrowIcon) {
              arrowIcon.classList.remove('down');
              arrowIcon.classList.add('up');
          }
        }
      }
    });
  });

  // Manejo de los botones AGREGAR/QUITAR (desktop)
  const actionButtons = document.querySelectorAll('.action-btn');

  actionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.setting-item');
      if (!parentItem) return;

      if (button.classList.contains('remove-btn')) {
        console.log(`Elemento "${parentItem.querySelector('.item-title').textContent}" QUITADO.`);
        // Cambiar a AGREGAR
        button.classList.remove('remove-btn');
        button.classList.add('add-btn');
        button.innerHTML = '<span class="plus-minus-icon plus-icon"></span> AGREGAR';
        parentItem.classList.remove('active'); // Remover clase active
        
        // Colapsar el contenido cuando se "quita"
        const content = parentItem.querySelector('.setting-expandable-content');
        if (content && !content.classList.contains('collapsed')) {
          content.classList.add('collapsed');
          const toggleArrowBtn = parentItem.querySelector('.toggle-arrow-btn');
          if (toggleArrowBtn) {
            toggleArrowBtn.setAttribute('aria-expanded', 'false');
            toggleArrowBtn.querySelector('.desktop-arrow').classList.remove('up');
            toggleArrowBtn.querySelector('.desktop-arrow').classList.add('down');
          }
        }

      } else if (button.classList.contains('add-btn')) {
        console.log(`Elemento "${parentItem.querySelector('.item-title').textContent}" AGREGADO.`);
        // Cambiar a QUITAR
        button.classList.remove('add-btn');
        button.classList.add('remove-btn');
        button.innerHTML = '<span class="plus-minus-icon minus-icon"></span> QUITAR';
        parentItem.classList.add('active'); // Añadir clase active
        // En este caso, no expandimos automáticamente al agregar, pero podrías hacerlo.
      }
    });
  });

  // Manejo de los switches (móvil)
  const switches = document.querySelectorAll('.switch-checkbox');
  switches.forEach(s => {
    s.addEventListener('change', (event) => {
      const parentItem = event.target.closest('.setting-item');
      if (!parentItem) return;

      // Si el switch se activa, añadir clase 'active' al item. Si se desactiva, quitarla.
      if (event.target.checked) {
        parentItem.classList.add('active');
        console.log(`Switch ${event.target.id} es: ON`);
      } else {
        parentItem.classList.remove('active');
        console.log(`Switch ${event.target.id} es: OFF`);
        // Opcional: Colapsar el contenido cuando se desactiva el switch en móvil
        const content = parentItem.querySelector('.setting-expandable-content');
        const toggleBtn = parentItem.querySelector('.toggle-content-btn');
        if (content && toggleBtn && !content.classList.contains('collapsed')) {
            content.classList.add('collapsed');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.textContent = 'VER MÁS';
            const arrow = document.createElement('span');
            arrow.classList.add('arrow-icon', 'mobile-arrow');
            toggleBtn.appendChild(arrow);
        }
      }
      // Aquí enviarías los datos a tu backend o los guardarías.
    });
  });
});