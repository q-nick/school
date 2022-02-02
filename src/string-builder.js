class StringBuilder {
  constructor(baseString) {
    this.value = baseString;
  }

  append(txt) {
    this.value += txt;
    return this;
  }

  prepend(str) {
    this.value = str + this.value;
    return this;
  }

  pad(str) {
    this.value = str + this.value + str;
    return this;
  }

  toString() {
    return this.value;
  }
}

const builder = new StringBuilder('.');

builder.append('^').prepend('^').pad('=');

// console.log is not using toString by default?
console.log(builder);

console.log(`${builder}`);
