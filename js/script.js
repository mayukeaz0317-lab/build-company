$(function () {
  $('.js-hamburger').on('click', function () {

    $('.js-header-menu').toggleClass('active');
    $(this).toggleClass('is-open');

    const isOpen = $(this).hasClass('is-open');

    $(this)
      .attr('aria-expanded', isOpen)
      .attr('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');

  });

  // メニュー内のリンクをクリックしたら閉じる
  $('.js-header-menu a').on('click', function () {

    $('.js-header-menu').removeClass('active');

    $('.js-hamburger')
      .removeClass('is-open')
      .attr('aria-expanded', 'false')
      .attr('aria-label', 'メニューを開く');

  });
  $(".fv-slider").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: false,
    accessibility: false,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: "ease-in-out"
  });

  let lastFocusedElement = null;

  // ----------------------------
  // モーダルを開く
  // ----------------------------
  function openModal(imgSrc, imgAlt, title, cat) {

    $('.js-modal-img')
      .attr('src', imgSrc)
      .attr('alt', imgAlt);

    $('.js-modal-title').text(title);
    $('.js-modal-cat').text(cat);

    $('#works-modal').fadeIn(function () {

      $('body').css('overflow', 'hidden');

      // 背景を操作不可
      $('#mainContent').attr('inert', '');

      // 閉じるボタンへフォーカス
      $('.js-modal-close').trigger('focus');

    });

  }

  // ----------------------------
  // モーダルを閉じる
  // ----------------------------
  function closeModal() {

    $('#works-modal').fadeOut(function () {

      $('body').css('overflow', '');

      // 背景を再度操作可能
      $('#mainContent').removeAttr('inert');

      // 元いた要素へフォーカスを戻す
      if (lastFocusedElement) {
        $(lastFocusedElement).trigger('focus');
      }

    });

  }

  // ----------------------------
  // 開く
  // ----------------------------
  $('.js-works-item').on('click', function () {

    lastFocusedElement = this;

    const img = $(this).find('img');

    openModal(
      img.attr('data-src'),
      img.attr('alt'),
      $(this).find('.js-works-title').text(),
      $(this).find('.js-works-cat').text()
    );

  });

  // ----------------------------
  // 閉じるボタン・オーバーレイ
  // ----------------------------
  $('.js-modal-close, .js-modal-overlay').on('click', function () {
    closeModal();
  });

  // ----------------------------
  // Escapeキー
  // ----------------------------
  $(document).on('keydown', function (e) {

    if (e.key !== 'Escape') return;

    if (!$('#works-modal').is(':visible')) return;

    closeModal();

  });

  // ----------------------------
  // Focus Trap
  // ----------------------------
  $(document).on('keydown', function (e) {

    if (!$('#works-modal').is(':visible')) return;

    if (e.key !== 'Tab') return;

    const focusableElements = $('#works-modal')
      .find('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])')
      .filter(':visible')
      .toArray();

    if (!focusableElements.length) return;

    const currentIndex = focusableElements.indexOf(document.activeElement);

    if (currentIndex === -1) {
      e.preventDefault();
      focusableElements[0].focus();
      return;
    }

    e.preventDefault();

    let nextIndex;

    if (e.shiftKey) {

      nextIndex =
        currentIndex === 0
          ? focusableElements.length - 1
          : currentIndex - 1;

    } else {

      nextIndex =
        currentIndex === focusableElements.length - 1
          ? 0
          : currentIndex + 1;

    }

    focusableElements[nextIndex].focus();

  });
  //スクロールアニメーション
  const targets = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -15% 0px"
  });

  targets.forEach((target) => observer.observe(target));

  //ページトップへ戻るボタン
  const pageTop = document.querySelector(".js-page-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      pageTop.classList.add("is-show");
    } else {
      pageTop.classList.remove("is-show");
    }
  });
});
