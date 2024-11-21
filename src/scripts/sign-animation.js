const container = document.getElementById('container');
const overlayCon = document.getElementById('overlayCon');
const overlayBtn = document.getElementById('overlayBtn');
const responsiveBtns = document.querySelectorAll('.responsive-btn');

overlayBtn.addEventListener('click', signAnimation);
responsiveBtns.forEach(element => element.addEventListener('click', signAnimation));

function signAnimation() {
  container.classList.toggle('right-panel-active');
  overlayBtn.classList.remove('btnScaled');
  window.requestAnimationFrame(() => overlayBtn.classList.add('btnScaled'));
  if(document.title.indexOf('Login') >= 0) {
    document.title = 'Cadastre-se | Eleições SP'
  } else {
    document.title = 'Login | Eleições SP';
  }
}