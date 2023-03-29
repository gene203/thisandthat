/**
 * A custom implementation of the Base64 encoding and decoding scheme called USRixits.
 *
 * "URL-safe Rixits" or "USRixits" for short
 *
 * USRixits uses 64 characters, which includes the digits 0-9, uppercase and lowercase letters A-Z,
 * the minus, period, and tilt characters. The encoding scheme also includes a padding character
 * (the tilt symbol '~') to be used when necessary. as like
 * 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-. and ~
 *
 * Unlike Base64 encoding which uses
 * ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ =
 * USRixits is as like an extension of hexadecimal, to be used in a URL's QueryString.
 
 * This is an extension from hexadecimal notation, and uses - and . as the last 62th, 63th.
 * Among the special characters of - . _ ~ that can be safely used in the QueryString of a URL,
 * except for _ which can cause visual confusion, and specifies ~ as a pad to be used if needed.
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
 * 64개의 문자에는 0-9, 대문자 및 소문자 A-Z, 마이너스(-), 마침표(.) 및 물결표(~) 기호가 포함됩니다.
 * 이 인코딩 스키마에는 패딩 문자(물결표 기호 '~')가 포함됩니다. 다음과 같이
 * 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-. 그리고 ~
 * 가 사용됩니다.
 *
 * Base64 인코딩의
 * ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+ =
 * 과 달리 16진법표기에서 확장한 형태로서, 마지막 62,63번째 특수 문자는 URL의
 * 쿼리문자열(QueryString)의 키와 값으로서 안전하게 사용될 수 있는 - . _ ~ 중,
 * 시각적 혼동이 생길 수 있는 _를 제외하고 - 와 .을 사용하며,
 * 필요할 경우 사용되는 패드(pad)로서 ~를 지정합니다.
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
  chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.',
  pad: '~',
  base: BigInt(64),

  /**
   * Encodes a BigInt into a USRixits string.
   * @param {BigInt|string|integer} num - The BigInt to encode.
   * @returns {string} The USRixits-encoded string.
   */
  encodeNumber: (num) => {
    num = BigInt(num);
    
    let result = '';

    while (num > 0) {
      result = USRixits.chars[num % USRixits.base] + result;
      num = num / USRixits.base;
    }
    return result;
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
      if (chunk === USRixits.pad + USRixits.pad) {
        break;
      }
      const charCode = parseInt(USRixits.decodeNumber(chunk));
      result += String.fromCharCode(charCode);
    }
    return result;
  },

  /**
   * Encodes a number in the given base.
   * @param {string | BigInt | int} num - The number to encode.
   * @param {number} base - The base to encode the number in (default: 10).
   * @returns {string} The encoded number as a string.
   */
  encodeNumberBase: (num, base = 10) => {
    num = BigInt(num);
    let result = '';
    while (num > 0n) {
      result = USRixits.chars[parseInt(num % BigInt(base))] + result;
      num = num / BigInt(base);
    }
    return result;
  },

  /**
   * Decodes a number from the given base.
   * @param {string} str - The string to decode.
   * @param {number} base - The base to decode the number from (default: 10).
   * @returns {string} The decoded number.
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
    return num.toString();
  }
};
