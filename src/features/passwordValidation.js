
export const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password harus minimal 8 karakter.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password harus memiliki setidaknya satu huruf besar.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password harus memiliki setidaknya satu angka.';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Password harus memiliki setidaknya satu simbol.';
    }
    return null;
  };
  