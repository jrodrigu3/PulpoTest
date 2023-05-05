import Swal from 'sweetalert2';

export let SwalUtils = {
  mensajeErrorCorrect(icon: string, title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No hay más peliculas',
      timer: 800
    });
  },

  mensajeSaved(icon: string = "", title: string = "", text: string = ""): void {
    Swal.fire({
      icon: 'success',
      title: 'MOVIE',
      text: 'SAVED',
      timer: 800
    });
  }
}
