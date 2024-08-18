import Swal from 'sweetalert2';

export const loginValidation = (user) => {
  if (user.statusPengguna === 'belum ter-verifikasi') {
    Swal.fire({
      title: 'Akun Belum Terverifikasi',
      text: 'Akun Anda belum terverifikasi, silakan hubungi admin untuk verifikasi.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then(() => {
      // Redirect to homepage or login page
      window.location.href = 'http://fabric-ternak.my.to/';
    });
    return false;
  }
  return true;
};
