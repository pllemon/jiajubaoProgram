const phone = (value) => {
  let pattern = /^1[34578]\d{9}$/;
  if (pattern.test(value)) {
    return true;
  } else {
    return false;
  }
}

const confirmPassword = (value1, value2) => {
  if (value1 == value2) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  phone,
  confirmPassword
}
