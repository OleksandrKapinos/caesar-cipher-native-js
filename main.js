const encryptButton = document.querySelector('.encrypt-btn');
const decryptButton = document.querySelector('.decrypt-btn');
const message = document.getElementById('message');
const shift = document.getElementById('shift');
const cipher = document.getElementById('cipher');

const alphabetUkr = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ';
const alphabetEng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = ' .,?/@"\'()[]*^&%$#*-+';
const elements = alphabetUkr + alphabetEng + numbers + symbols;

class CaesarCipher{
  constructor(elements, message, shift, cipher) {
    this.elements = elements;
    this.message = message;
    this.shift = shift;
    this.cipher = cipher;
  }

  shiftAlphabet = (shift) => {
    let shiftedAlphabet = '';
    for (let i = 0; i < this.elements.length; i++) {
      const currentText = (this.elements[i + shift] === undefined)
        ? (this.elements[i + shift - this.elements.length])
        : (this.elements[i + shift]);
      shiftedAlphabet = shiftedAlphabet.concat(currentText);
    }
    return shiftedAlphabet;
  }

  encrypt = () => {
    const text = this.message.value;
    const shifting = parseInt(this.shift.value);
    const shiftedAlphabet = this.shiftAlphabet(shifting);
    let encryptedMessage = '';
    for (let i = 0; i < text.length; i++) {
      const indexOfLetter = this.elements.indexOf(text[i].toUpperCase());
      encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
    }
    this.cipher.value = encryptedMessage.toLowerCase();
  };

  decrypt = () => {
    const text = this.cipher.value;
    const shifting = parseInt(this.shift.value);
    const shiftedAlphabet = this.shiftAlphabet(shifting);
    let encryptedMessage = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        encryptedMessage = encryptedMessage.concat(' ');
      }
      const indexOfLetter = shiftedAlphabet.indexOf(text[i].toUpperCase());
      encryptedMessage = encryptedMessage.concat(this.elements[indexOfLetter]);
    }
    this.message.value = encryptedMessage.toLowerCase();
  }
}

const caesarCipher = new CaesarCipher(elements, message, shift, cipher);

encryptButton.addEventListener('click', caesarCipher.encrypt );
decryptButton.addEventListener('click', caesarCipher.decrypt );
