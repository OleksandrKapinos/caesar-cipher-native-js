const encryptButton = document.querySelector('.encrypt-btn');
const decryptButton = document.querySelector('.decrypt-btn');
const message = document.getElementById('message');
const shift = document.getElementById('shift');
const cipher = document.getElementById('cipher');

const alphabet = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ';

class CaesarCipher{
  constructor(alphabet, message, shift, cipher) {
    this.alphabet = alphabet;
    this.message = message;
    this.shift = shift;
    this.cipher = cipher;
  }

  shiftAlphabet = (shift) => {
    let shiftedAlphabet = '';
    for (let i = 0; i < this.alphabet.length; i++) {
      const currentText = (this.alphabet[i + shift] === undefined)
        ? (this.alphabet[i + shift - this.alphabet.length])
        : (this.alphabet[i + shift]);
      shiftedAlphabet = shiftedAlphabet.concat(currentText);
    }
    return shiftedAlphabet;
  };

  coder = (text, status) => {
    const shifting = parseInt(this.shift.value);
    const shiftedAlphabet = this.shiftAlphabet(shifting);
    let crypticMessage = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        crypticMessage = crypticMessage.concat(' ');
      } else if(status === 'encrypt'){
        const indexOfLetter = this.alphabet.indexOf(text[i].toUpperCase());
        crypticMessage = crypticMessage.concat(shiftedAlphabet[indexOfLetter]);
      } else {
        const indexOfLetter = shiftedAlphabet.indexOf(text[i].toUpperCase());
        crypticMessage = crypticMessage.concat(this.alphabet[indexOfLetter]);
      }
    }
    return crypticMessage.toLowerCase();
  };

  encrypt = () => {
    const text = this.message.value;
    this.cipher.value = this.coder(text, 'encrypt');
  };

  decrypt = () => {
    const text = this.cipher.value;
    this.message.value = this.coder(text, 'decrypt');
  };
}

const caesarCipher = new CaesarCipher(alphabet, message, shift, cipher);

encryptButton.addEventListener('click', caesarCipher.encrypt );
decryptButton.addEventListener('click', caesarCipher.decrypt );
