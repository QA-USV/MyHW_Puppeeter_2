/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */

module.exports = {
  generateName(length) {
    let name = ''; // здесь будем хранить результат
    const chars = 'abcdefgABCDEFG1234567890'; // возможные символы
    const charLength = chars.length; // определяем длину
    for (let i = 0; i < length; i++) {
      // запускаем цикл для формирования строки
      name += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return name;
  },
};
