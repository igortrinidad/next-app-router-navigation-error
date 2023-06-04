
export const cpfValidator = (value: any) => {
  if(typeof value != 'string') {
    value = value.toString()
  }
  if (value.length < 14) return true

  let cpf = value.replace(/\D/g, '');
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return true;
  var result = false;
  [9, 10].forEach(function (j) {
    var soma = 0, r;
    cpf.split(/(?=)/).splice(0, j).forEach(function (e: string, i: number) {
      soma += parseInt(e) * ((j + 2) - (i + 1));
    });
    r = soma % 11;
    r = (r < 2) ? 0 : 11 - r;
    if (r != cpf.substring(j, j + 1)) result = true;
  });
  return result;
}

export const bdayValidator = (value: any) => {
  if (value.length < 10) return true
  // if (!Dates.isValid(value)) return true
}

export const emailValidator = (value: any) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(value).toLowerCase());
}

export const phoneValidator = (value: any) => {
  if (!value || value.length < 14) return true
}

export const cepValidator = (value: any) => {
  if (!value || value.length < 9) return true
}

export const minValueValidator = (value: any, min = 0) => {
  if (!value || value < min) return true
}

export const minLength = (value: any, min = 6) => {
  if (!value || value.length < min) return true
}

export const minWords = (value = '', min = 2) => {
  if(value === null) value = ''
  return Boolean(value.split(/&nbsp| /).length < min)
}

export const notEmpty = (value = '') => {
  if([undefined, null, ''].includes(value)) return true
}

export const inputConfirmation = (first: any, second: any) => {
  if (first !== second) return true
}

export const fileValidation = (file: any) => {
  return Boolean(!file || !file.name)
}

export const booleanShouldBeTrueValidation = (value: any) => {
  return Boolean(value != true)
}

const Validators = {
  cpfValidator,
  bdayValidator,
  emailValidator,
  phoneValidator,
  cepValidator,
  minValueValidator,
  minLength,
  minWords,
  inputConfirmation,
  fileValidation,
  booleanShouldBeTrueValidation,
  notEmpty,
}

export default Validators

