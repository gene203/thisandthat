/**
 * A custom implementation of the Base64 encoding and decoding scheme called MyBase64.
 *
 * MyBase64 uses 64 characters, which includes the digits 0-9, uppercase and lowercase letters A-Z,
 * the period, underscore, and minus characters. The encoding scheme also includes a padding character
 * (the minus symbol '-').
 *
 * The module provides the following functions:
 *
 * - `MyBase64.encodeNumber(num)`: Encodes a number into a MyBase64 string.
 *
 * - `MyBase64.decodeNumber(str)`: Decodes a MyBase64-encoded string into a number.
 *
 * - `MyBase64.encodeString(str)`: Encodes a JavaScript string into a MyBase64-encoded string.
 *
 * - `MyBase64.decodeString(str)`: Decodes a MyBase64-encoded string into a JavaScript string.
 *
 * The module also provides two functions for encoding and decoding numbers in a specified base:
 *
 * - `encodeNumberBase(num, base)`: Encodes a number in the specified base.
 *
 * - `decodeNumberBase(str, base)`: Decodes a number from the specified base.
 *
 * Note that the encoding and decoding functions may throw errors if the input is not valid.
 *
 * MyBase64는 64개의 문자를 사용하여 구성된 Base64 인코딩 및 디코딩 스키마를 제공하는 커스텀 구현입니다.
 * 64개의 문자에는 0-9, 대문자 및 소문자 A-Z, 마침표, 언더바 및 마이너스 기호가 포함됩니다.
 * 이 인코딩 스키마에는 패딩 문자(마이너스 기호 '-')가 포함됩니다.
 *
 * 이 모듈은 다음과 같은 함수를 제공합니다:
 *
 * - `MyBase64.encodeNumber(num)`: 숫자를 MyBase64 문자열로 인코딩합니다.
 *
 * - `MyBase64.decodeNumber(str)`: MyBase64로 인코딩된 문자열을 숫자로 디코딩합니다.
 *
 * - `MyBase64.encodeString(str)`: 자바스크립트 문자열을 MyBase64로 인코딩된 문자열로 인코딩합니다.
 *
 * - `MyBase64.decodeString(str)`: MyBase64로 인코딩된 문자열을 자바스크립트 문자열로 디코딩합니다.
 *
 * 또한 이 모듈은 지정된 진수에서 숫자를 인코딩 및 디코딩하기 위한 두 개의 함수를 제공합니다:
 *
 * - `encodeNumberBase(num, base)`: 지정된 진수에서 숫자를 인코딩합니다.
 *
 * - `decodeNumberBase(str, base)`: 지정된 진수에서 숫자를 디코딩합니다.
 *
 * 인코딩 및 디코딩 함수는 입력이 유효하지 않은 경우 오류를 throw할 수 있습니다.
 * @version 1.0.0
 * @license MIT
 * @author
 * Jinhyoung Park <gene203@gmail.com>
 */

const MyBase64 = {
  chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz._-',
  base: BigInt(64),

  /**
   * Encodes a BigInt into a MyBase64 string.
   * @param {BigInt} num - The BigInt to encode.
   * @returns {string} The MyBase64-encoded string.
   */
  encodeNumber: (num) => {
    let result = '';
    while (num > 0) {
      result = MyBase64.chars[Number(num % MyBase64.base)] + result;
      num = num / MyBase64.base;
    }
    return result || '-';
  },

  /**
   * Decodes a MyBase64 string into a BigInt.
   * @param {string} str - The MyBase64-encoded string to decode.
   * @returns {BigInt} The decoded BigInt.
   * @throws {Error} If the input string is not a valid MyBase64 string.
   */
  decodeNumber: (str) => {
    let num = BigInt(0);
    for (let i = 0; i < str.length; i++) {
      const charIndex = MyBase64.chars.indexOf(str[i]);
      if (charIndex === -1) {
        throw new Error(`Invalid MyBase64 character: ${str[i]}`);
      }
      num = num * MyBase64.base + BigInt(charIndex);
    }
    return num;
  },

  /**
   * Encodes a JavaScript string into a MyBase64-encoded string.
   * @param {string} str - The string to encode.
   * @returns {string} The MyBase64-encoded string.
   */
  encodeString: (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = BigInt(str.charCodeAt(i));
      result += MyBase64.encode(charCode);
    }
    return result;
  },

  /**
   * Decodes a MyBase64-encoded string into a JavaScript string.
   * @param {string} str - The MyBase64-encoded string to decode.
   * @returns {string} The decoded JavaScript string.
   * @throws {Error} If the input string is not a valid MyBase64-encoded string.
   */
  decodeString: (str) => {
    let result = '';
    for (let i = 0; i < str.length; i += 2) {
      const chunk = str.substr(i, 2);
      if (chunk === '--') {
        break;
      }
      const charCode = Number(MyBase64.decode(chunk));
      result += String.fromCharCode(charCode);
    }
    return result;
  },

  /**
   * Encodes a number in the given base.
   * @param {string | number} num - The number to encode.
   * @param {number} base - The base to encode the number in (default: 10).
   * @returns {string} The encoded number as a string.
   */
  encodeNumberBase: (num, base = 10) => {
    num = BigInt(num);
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz._-';
    let result = '';
    while (num > 0n) {
      result = chars[Number(num % BigInt(base))] + result;
      num = num / BigInt(base);
    }
    return result || '0';
  },

  /**
   * Decodes a number from the given base.
   * @param {string} str - The string to decode.
   * @param {number} base - The base to decode the number from (default: 10).
   * @returns {number} The decoded number.
   */
  decodeNumberBase: (str, base = 10) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz._-';
    let num = 0n;
    for (let i = 0; i < str.length; i++) {
      const charIndex = chars.indexOf(str[i]);
      if (charIndex === -1 || charIndex >= base) {
        throw new Error(`Invalid base-${base} character: ${str[i]}`);
      }
      num = num * BigInt(base) + BigInt(charIndex);
    }
    return Number(num);
  }
};
