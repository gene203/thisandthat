/*
 * shinyButton - jQuery plugin for creating a shiny, silver, rectangular button that tilts based on the position of the mouse cursor from the top view.
 *
 * This function takes an options object as a parameter, which allows customization of various constants used in the code.
 *
 * The available options are:
 * - borderRadius: The border radius of the button in pixels.
 * - padding: The padding of the button in pixels.
 * - fontSize: The font size of the button text in pixels.
 * - fontWeight: The font weight of the button text.
 * - textColor: The color of the button text.
 * - textShadow: The text shadow of the button text.
 * - gradientStartColor: The start color of the silver gradient background.
 * - gradientMiddleColor: The middle color of the silver gradient background.
 * - gradientEndColor: The end color of the silver gradient background.
 * - boxShadowColor: The color of the button box shadow.
 * - transitionTime: The transition time of the button in seconds.
 * - tiltAmount: The maximum tilt amount of the button in degrees.
 * - perspectiveDistance: The distance of the perspective of the button in pixels.
 * - width: The width of the button in pixels.
 * - height: The height of the button in pixels.
 *
 * Usage:
 * $(".my-button-class").shinyButton({
 *   tiltAmount: 20,
 *   width: 300,
 *   height: 150
 * });
 *
 * This will apply the shinyButton effect to all elements with the class "my-button-class",
 * with a maximum tilt amount of 20 degrees and a width of 300 pixels and a height of 150 pixels.
 *
 * shinyButton - 마우스 커서의 위치에 따라 기울어지는 반짝이는 실버색 직사각형 버튼을 생성하는 jQuery 플러그인입니다.
 *
 * 이 함수는 옵션 객체를 매개변수로 받아 코드에서 사용되는 여러 상수를 사용자 정의할 수 있습니다.
 *
 * 사용 가능한 옵션은 다음과 같습니다:
 * - borderRadius: 버튼의 테두리 반지름입니다.
 * - padding: 버튼의 내부 여백입니다.
 * - fontSize: 버튼 텍스트의 글꼴 크기입니다.
 * - fontWeight: 버튼 텍스트의 글꼴 두께입니다.
 * - textColor: 버튼 텍스트의 색상입니다.
 * - textShadow: 버튼 텍스트의 그림자입니다.
 * - gradientStartColor: 실버 그라데이션 배경의 시작 색상입니다.
 * - gradientMiddleColor: 실버 그라데이션 배경의 중간 색상입니다.
 * - gradientEndColor: 실버 그라데이션 배경의 끝 색상입니다.
 * - boxShadowColor: 버튼 상자 그림자의 색상입니다.
 * - transitionTime: 버튼의 전환 시간(초)입니다.
 * - tiltAmount: 버튼의 최대 기울기 각도입니다.
 * - perspectiveDistance: 버튼의 원근 거리입니다.
 * - width: 버튼의 너비입니다.
 * - height: 버튼의 높이입니다.
 *
 * 사용법:
 * $(".my-button-class").shinyButton({
 *   tiltAmount: 20,
 *   width: 300,
 *   height: 150
 * });
 *
 * 이렇게 하면 "my-button-class" 클래스를 가진 모든 요소에 shinyButton 효과가 적용되며,
 * 최대 기울기 각도가 20도이고 너비가 300픽셀이고 높이가 150픽셀인 버튼이 생성됩니다. 
 * @version 1.0.0
 * @license MIT
 * @author
 * Jinhyoung Park <gene203@gmail.com>
 */

$.fn.shinyButton = function(options) {
  // Default options
  var settings = $.extend({
    borderRadius: 10,  // The border radius of the button in pixels
    padding: 20,  // The padding of the button in pixels
    fontSize: 16,  // The font size of the button text in pixels
    fontWeight: "bold",  // The font weight of the button text
    textColor: "#fff",  // The color of the button text
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)",  // The text shadow of the button text
    gradientStartColor: "#F1F1F1",  // The start color of the silver gradient background
    gradientMiddleColor: "#E5E5E5",  // The middle color of the silver gradient background
    gradientEndColor: "#F1F1F1",  // The end color of the silver gradient background
    boxShadowColor: "#B9B9B9",  // The color of the button box shadow
    transitionTime: 0.2,  // The transition time of the button in seconds
    tiltAmount: 10,  // The maximum tilt amount of the button in degrees
    perspectiveDistance: 500,  // The distance of the perspective of the button in pixels
    width: 200,  // The width of the button in pixels
    height: 100  // The height of the button in pixels
  }, options );

  // Apply options to button
  return this.each(function() {
    var $this = $(this);
    $this.css({
      position: "relative",
      display: "inline-block",
      border: "none",
      borderRadius: settings.borderRadius + "px",  // Set the border radius of the button
      padding: settings.padding + "px",  // Set the padding of the button
      fontSize: settings.fontSize + "px",  // Set the font size of the button text
      fontWeight: settings.fontWeight,  // Set the font weight of the button text
      color: settings.textColor,  // Set the color of the button text
      textAlign: "center",
      textShadow: settings.textShadow,  // Set the text shadow of the button text
      background: "linear-gradient(45deg, " + settings.gradientStartColor + ", " + settings.gradientMiddleColor + ", " + settings.gradientEndColor + ")",  // Set the background of the button to a silver gradient
      boxShadow: "0px 0px 10px " + settings.boxShadowColor,  // Set the box shadow of the button
      transition: "all " + settings.transitionTime + "s ease-out",  // Set the transition of the button
      transform: "perspective(" + settings.perspectiveDistance + "px) rotateX(0deg) rotateY(0deg)",  // Set the perspective and rotation of the button
      width: settings.width + "px",  // Set the width of the button
      height: settings.height + "px"  // Set the height of the button
    });

    // Mouse tracking effect
    $this.mousemove(function(e) {
      var x = e.pageX - $this.offset().left;
      var y = e.pageY - $this.offset().top;
      var centerX = $this.outerWidth() / 2;
      var centerY = $this.outerHeight() / 2;
      var diffX = x - centerX;
      var diffY = y - centerY;
      var degreeX = -diffY / centerY * settings.tiltAmount; // Calculate the degree of rotation around the X axis based on the proportional difference between the mouse position and the center of the button and the height of the button, multiplied by the maximum tilt amount
      var degreeY = diffX / centerX * settings.tiltAmount; // Calculate the degree of rotation around the Y axis based on the proportional difference between the mouse position and the center of the button and the width of the button, multiplied by the maximum tilt amount
      $this.css({
        transform: "perspective(" + settings.perspectiveDistance + "px) rotateX(" + degreeX + "deg) rotateY(" + degreeY + "deg)" // Set the perspective and rotation of the button based on the calculated degrees
      });
    });
    // Reset button on mouse leave
    $this.mouseleave(function() {
      $this.css({
        transform: "perspective(" + settings.perspectiveDistance + "px) rotateX(0deg) rotateY(0deg)",  // Reset the perspective and rotation of the button
        boxShadow: "0px 0px 10px " + settings.boxShadowColor  // Reset the box shadow of the button
      });
    });
  });
};
