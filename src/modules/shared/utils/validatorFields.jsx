export const validatorFields = ({ form, isLogin = false }) => {
    const { email, password, confirmPassword } = form;
  
    // Validaciones comunes para login y registro
    if (!email) {
      alert("El campo de correo electrónico es obligatorio.");
      return false;
    }
  
    if (!password) {
      alert("El campo de contraseña es obligatorio.");
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce una dirección de correo electrónico válida.");
      return false;
    }
  
    /* const validDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    const emailDomain = email.split("@")[1];
    if (!validDomains.includes(emailDomain)) {
      alert(
        `Por favor, introduce una dirección de correo electrónico con un dominio válido (eg. gmail.com", "hotmail.com" o "outlook.com`
      );
      return false;
    } */
  
    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }
  
    // Validaciones específicas para registro
    if (!isLogin) {
      if (!confirmPassword) {
        alert("El campo de confirmación de contraseña es obligatorio.");
        return false;
      }
  
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
      }
    }
  
    return true;
  };