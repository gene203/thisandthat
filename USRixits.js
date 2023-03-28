/**
 * A custom implementation of the Base64 encoding and decoding scheme called USRixits.
 *
 * "URL-safe Rixits" or "USRixits" for short
 *
 * USRixits uses 64 characters, which includes the digits 0-9, uppercase and lowercase letters A-Z,
 * the minus, underscore, and period characters. The encoding scheme also includes a padding character
 * (the period symbol '-') which is optional.
 *
 * the "USRixits" encoding scheme uses the character set 
 * "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_" for encoding data, with "." as 
 * the padding character. This variant is based on the RFC 4648 §5 "base64url" encoding, which is 
 * designed for use in URL and filename contexts. The "urRixits" encoding scheme is similar to 
 * "base64url", but uses "." as the padding character instead of the "=" character.
 *
 * The module provides the following functions:
 *
 * - `USRixits.encodeNumber(num)`: Encodes a number into a USRixits string.
 *
 * - `USRixits.decodeNumber(str)`: Decodes a USRixits-encoded string into a number.
 *
 * - `USRixits.encodeString(str)`: Encodes a JavaScript string into a USRixits-encoded string.
 *
 * - `USRixits.decodeString(str)`: Decodes a USRixits-encoded string into a JavaScript string.
 *
 * The module also provides two functions for encoding and decoding numbers in a specified base:
 *
 * - `encodeNumberBase(num, base)`: Encodes a number in the specified base.
 *
 * - `decodeNumberBase(str, base)`: Decodes a number from the specified base.
 *
 * Note that the encoding and decoding functions may throw errors if the input is not valid.
 *
 * USRixits는 64개의 문자를 사용하여 구성된 Base64 인코딩 및 디코딩 스키마를 제공하는 커스텀 구현입니다.
 * "URL-safe Rixits" / "URL-안전 릭시트" 혹은 짧게 "USRixits" / "US릭시트"로 명명합니다.
 * 
 * 64개의 문자에는 0-9, 대문자 및 소문자 A-Z, 마이너스, 언더바 및 마침표 기호가 포함됩니다.
 * 이 인코딩 스키마에는 패딩 문자(마침표 기호 '-')가 포함됩니다.
 *
 * "USRixits" 인코딩 체계는 "."를 패딩 문자로 사용하여 데이터를 인코딩하는 데 
 * "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_" 문자 집합을 사용합니다.
 * 이 변형은 URL 및 파일 이름 컨텍스트에서 사용하도록 설계된 RFC 4648 §5 "base64url" 인코딩을 기반으로 합니다.
 * "USRixits" 인코딩 체계는 "base64url"과 유사하지만 "=" 문자 대신 "."를 패딩 문자로 사용합니다.
 *
 * 이 모듈은 다음과 같은 함수를 제공합니다:
 *
 * - `USRixits.encodeNumber(num)`: 숫자를 USRixits 문자열로 인코딩합니다.
 *
 * - `USRixits.decodeNumber(str)`: USRixits로 인코딩된 문자열을 숫자로 디코딩합니다.
 *
 * - `USRixits.encodeString(str)`: 자바스크립트 문자열을 USRixits로 인코딩된 문자열로 인코딩합니다.
 *
 * - `USRixits.decodeString(str)`: USRixits로 인코딩된 문자열을 자바스크립트 문자열로 디코딩합니다.
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

const USRixits = {
  chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.',
  base: BigInt(64),

  /**
   * Encodes a BigInt into a USRixits string.
   * @param {BigInt} num - The BigInt to encode.
   * @returns {string} The USRixits-encoded string.
   */
  encodeNumber: (num) => {
    let result = '';
    while (num > 0) {
      result = USRixits.chars[Number(num % USRixits.base)] + result;
      num = num / USRixits.base;
    }
    return result || '-';
  },

  /**
   * Decodes a USRixits string into a BigInt.
   * @param {string} str - The USRixits-encoded string to decode.
   * @returns {BigInt} The decoded BigInt.
   * @throws {Error} If the input string is not a valid USRixits string.
   */
  decodeNumber: (str) => {
    let num = BigInt(0);
    for (let i = 0; i < str.length; i++) {
      const charIndex = USRixits.chars.indexOf(str[i]);
      if (charIndex === -1) {
        throw new Error(`Invalid USRixits character: ${str[i]}`);
      }
      num = num * USRixits.base + BigInt(charIndex);
    }
    return num;
  },

  /**
   * Encodes a JavaScript string into a USRixits-encoded string.
   * @param {string} str - The string to encode.
   * @returns {string} The USRixits-encoded string.
   */
  encodeString: (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = BigInt(str.charCodeAt(i));
      result += USRixits.encodeNumber(charCode);
    }
    return result;
  },

  /**
   * Decodes a USRixits-encoded string into a JavaScript string.
   * @param {string} str - The USRixits-encoded string to decode.
   * @returns {string} The decoded JavaScript string.
   * @throws {Error} If the input string is not a valid USRixits-encoded string.
   */
  decodeString: (str) => {
    let result = '';
    for (let i = 0; i < str.length; i += 2) {
      const chunk = str.substr(i, 2);
      if (chunk === '--') {
        break;
      }
      const charCode = Number(USRixits.decodeNumber(chunk));
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
    let result = '';
    while (num > 0n) {
      result = USRixits.chars[Number(num % BigInt(base))] + result;
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
    let num = 0n;
    for (let i = 0; i < str.length; i++) {
      const charIndex = USRixits.chars.indexOf(str[i]);
      if (charIndex === -1 || charIndex >= base) {
        throw new Error(`Invalid base-${base} character: ${str[i]}`);
      }
      num = num * BigInt(base) + BigInt(charIndex);
    }
    return Number(num);
  }
};
