console.log('Hello JS');

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerFixed = document.querySelector('.header__fixed');
    const introImage = document.querySelector('.intro__image-content');
    
    // Проверяем, есть ли нужные элементы
    if (!header || !headerFixed || !introImage) return; // Если одного из элементов нет, выходим

    let lastScrollY = window.scrollY;
    let ticking = false;

    /**
     * Обновляет высоту хедера.
     */
    const updateHeaderHeight = () => {
        header.style.height = `${headerFixed.offsetHeight}px`;
    };

    /**
     * Обрабатывает скролл для хедера.
     */
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            // Вернулись в самое начало → убираем active
            headerFixed.classList.remove('active');
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // Скроллим вниз → скрываем
            headerFixed.classList.add('active');
        } else if (currentScrollY < lastScrollY) {
            // Скроллим вверх → показываем
            headerFixed.classList.remove('active');
        }

        lastScrollY = currentScrollY;
    };

    /**
     * Обрабатывает событие скролла.
     */
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    };

    /**
     * Обрабатывает параллакс эффект для изображения.
     */
    const handleParallax = () => {
        const scrollY = window.scrollY;
        const introImageRect = introImage.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (introImageRect.top < windowHeight && introImageRect.bottom > 0) {
            introImage.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateHeaderHeight);

    updateHeaderHeight(); // Устанавливаем начальную высоту
});

document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll(".projects__container"); // Элементы с параллаксом
    const fixedHeader = document.querySelector(".header__fixed");
    const projectsContainer = document.querySelector(".projects__list"); // Родительский контейнер
    const fixedHeaderHeight = fixedHeader ? fixedHeader.offsetHeight : 0;

    const handleProjectParallax = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Отключаем параллакс на экранах меньше 768px
        if (windowWidth < 768) {
            projectItems.forEach(item => {
                const content = item.querySelector(".projects__box");
                if (content) content.style.transform = '';
            });
            return;
        }

        projectItems.forEach(item => {
            const content = item.querySelector(".projects__box");
            const meta = item.querySelector(".projects__meta"); // Meta блок, чтобы не наезжать
            const itemRect = item.getBoundingClientRect();
            const containerRect = projectsContainer.getBoundingClientRect(); // Границы родителя

            // Проверяем, что элемент в области видимости
            if (itemRect.top < windowHeight && itemRect.bottom > 0) {
                // Корректируем расчет с учетом фиксированного хедера
                const adjustedBottom = itemRect.bottom - fixedHeaderHeight;
                const progress = Math.min(1, Math.max(0, 1 - adjustedBottom / windowHeight));

                // Ограничиваем смещение внутри родительского контейнера
                const maxOffset = item.clientHeight - content.clientHeight;

                // Вычитаем высоту meta блока из доступного смещения
                const metaHeight = meta ? meta.clientHeight : 0;
                const adjustedMaxOffset = Math.max(0, maxOffset - metaHeight);

                // Параметр усиления эффекта
                const factor = 1.2;

                // Рассчитываем итоговое смещение
                const translateY = Math.min(adjustedMaxOffset, adjustedMaxOffset * progress * factor);

                // Применяем смещение для контента
                content.style.transform = `translateY(${translateY}px)`;
            }
        });
    };

    // Обработчики событий
    window.addEventListener("scroll", handleProjectParallax);
    window.addEventListener("resize", handleProjectParallax);

    // Начальный запуск параллакса при загрузке страницы
    handleProjectParallax();
});





document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");

    // Функция для анимации счетчика и прогресс-бара
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target"); // Целевое значение
        const duration = 2000; // Длительность анимации
        const startTime = performance.now();

        // Находим соответствующий прогресс-бар
        const progressBar = counter.closest("p").nextElementSibling.querySelector(".progress");

        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Прогресс от 0 до 1
            const value = Math.floor(progress * target); // Текущее значение

            counter.textContent = value; // Обновляем текст счетчика
            progressBar.style.width = `${progress * 100}%`; // Обновляем ширину прогресс-бара

            if (progress < 1) {
                requestAnimationFrame(updateCounter); // Продолжаем анимацию
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Настройки для Intersection Observer
    const options = {
        root: null, // Используем viewport как область отслеживания
        rootMargin: "0px", // Без отступов
        threshold: 0.5, // Запускать анимацию, когда 50% элемента видно
    };

    // Создаем Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Если элемент виден, запускаем анимацию для всех счетчиков
                counters.forEach((counter) => {
                    animateCounter(counter);
                });
                observer.disconnect(); // Останавливаем наблюдение после запуска анимации
            }
        });
    }, options);

    // Наблюдаем за блоком, содержащим счетчики
    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

document.addEventListener("DOMContentLoaded", () =>{
    const headerButton = document.querySelector('.header__actions-btn');
    const openModal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close-btn')
    addEventListener('click',() => headerButton.onclick = () => {
        openModal.classList.toggle('active');
      
    })
    addEventListener('click',() => closeModal.onclick = () => {
        openModal.classList.remove('active');
    })
});

document.addEventListener("DOMContentLoaded", () => {
    const headerMenuBurger = document.querySelector('.header__burger-menu');
    const headerMenuLines = document.querySelectorAll('.header__burger-line');
    const headerMenuList = document.querySelector('.header__nav');
    const headerButton = document.querySelector('.header__actions-btn');
    const headerActions = document.querySelector('.header__actions');
    const headerLogo = document.querySelector('.header__logo');

    // Клонируем логотип один раз при загрузке страницы
    const headerLogoClone = headerLogo.cloneNode(true);

    headerMenuBurger.addEventListener('click', () => {
        // Если меню открыто (есть класс 'active'), удаляем кнопку и логотип
        if (headerMenuList.classList.contains('active')) {
            headerMenuList.removeChild(headerButton);
            headerMenuList.removeChild(headerLogoClone);

            // Возвращаем кнопку в headerActions (вторым элементом)
            const secondChild = headerActions.children[1]; // Второй дочерний элемент
            headerActions.insertBefore(headerButton, secondChild);
        }
        // Если меню закрыто (нет класса 'active'), добавляем кнопку и логотип
        else {
            headerMenuList.appendChild(headerButton);
            headerMenuList.appendChild(headerLogoClone);
        }

        // Переключаем классы
        headerMenuList.classList.toggle('active');
        headerMenuBurger.classList.toggle('active');
        headerMenuLines.forEach(line => {
            line.classList.toggle('active');
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const itemHeaders = document.querySelectorAll('.services__item-header');
    const itemsContent = document.querySelectorAll('.services__item-content');

    itemHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            itemHeaders.forEach(content => {
                content.classList.remove('open');
            });
            // Закрываем все открытые табы
            itemsContent.forEach(content => {
                content.classList.remove('open');
            });

            // Открываем текущий таб
            if (!itemsContent[index].classList.contains('open')) {
                itemsContent[index].classList.add('open');
            } else {
                itemsContent[index].classList.remove('open');
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const servicesRow = document.querySelector(".services__row");
    const tabs = document.querySelectorAll(".services__tab");
     // Проверяем, если .services__row существует
     if (!servicesRow) return; // Если нет, выходим из функции

     // Проверяем, если есть хотя бы один таб
     if (tabs.length === 0) return; // Если табов нет, выходим из функции

    // Создаём элемент для отображения изображения
    const rowImage = document.createElement("div");
    rowImage.classList.add("services__row-image");
    servicesRow.prepend(rowImage); // Вставляем изображение в начало .services__row

    // Функция для отображения изображения
    const showImage = (tab) => {
        const tabImage = tab.querySelector(".services__tab-image"); // Находим изображение внутри таба
        if (tabImage) {
            // Создаём копию изображения
            const imageClone = tabImage.cloneNode(true);
            imageClone.classList.add("active"); // Добавляем класс для стилизации
            rowImage.innerHTML = ""; // Очищаем содержимое .services__row-image
            rowImage.appendChild(imageClone); // Добавляем копию изображения
            rowImage.style.opacity = 1; // Показываем изображение
        }
    };

    // Показываем изображение для первого таба при загрузке страницы
    if (tabs.length > 0) {
        showImage(tabs[0]);
    }

    let lastActiveTab = tabs[0]; // Сохраняем ссылку на последний активный таб

    tabs.forEach((tab) => {
        tab.addEventListener("mouseenter", function () {
            showImage(this);
            lastActiveTab = this; // Обновляем последний активный таб
        });

        tab.addEventListener("mouseleave", function () {
            showImage(lastActiveTab); // Показываем последнее активное изображение
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
        const tabTitles = document.querySelectorAll(".services__tab-title");

        tabTitles.forEach((title) => {
            title.addEventListener("click", function () {
                const tabContent = title.nextElementSibling;

                // Удаляем "open" у всех табов
                document.querySelectorAll(".services__tab-content").forEach(content => {
                    if (content !== tabContent) {
                        content.classList.remove("open");
                    }
                });

                // Переключаем "open" у кликнутого таба
                if (tabContent && tabContent.classList.contains("services__tab-content")) {
                    tabContent.classList.toggle("open");
                }
            });
        });
    });

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.accordion__header').forEach((header) => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion__item'); // Находим родительский элемент вкладки
        const content = item.querySelector('.accordion__content'); // Находим контент текущей вкладки
  
        // Закрываем все вкладки
        document.querySelectorAll('.accordion__item').forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion__content').style.maxHeight = null;
          }
        });
  
        // Открываем/закрываем текущую вкладку
        item.classList.toggle('active');
  
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + "px"; // Открываем контент
        } else {
          content.style.maxHeight = null; // Закрываем контент
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('[data-parallax]');

    // Проверка наличия элементов с data-parallax
    if (elements.length === 0) return;

    // Получаем родительский элемент для первого элемента с data-parallax
    const parent = elements[0].closest('.choose-wise__row');

    // Если родительский элемент не найден, выходим
    if (!parent) return;

    const handleParallax = () => {
        if (window.innerWidth < 1024) {
            // Отключаем параллакс на маленьких экранах
            elements.forEach(el => el.style.transform = '');
            return;
        }

        const parentHeight = parent.offsetHeight;
        const maxTranslate = parentHeight - elements[0].offsetHeight;

        window.addEventListener('scroll', () => {
            if (window.innerWidth < 1024) return; // Проверяем при каждом скролле

            const scrollY = window.scrollY;
            const parentOffsetTop = parent.offsetTop;
            const parentBottom = parentOffsetTop + parentHeight;

            // Если родитель в зоне видимости
            if (scrollY >= parentOffsetTop && scrollY <= parentBottom) {
                const progress = (scrollY - parentOffsetTop) / parentHeight;
                const translateY = maxTranslate * progress;

                // Применяем трансформацию ко всем элементам с data-parallax
                elements.forEach(el => {
                    el.style.transform = `translateY(${translateY}px)`;
                });
            }
        });
    };

    // Запуск при загрузке
    handleParallax();

    // Перезапуск при изменении размеров окна
    window.addEventListener('resize', handleParallax);
});

  
  

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".clients__slider", {
      loop: true, // Бесконечный слайдер
      slidesPerView: 4, // Количество видимых слайдов
      spaceBetween: 30, // Отступ между слайдами
      navigation: {
        nextEl: ".clients__button-next",
        prevEl: ".clients__button-prev",
      },
      pagination: {
        el: ".clients__pagination",
        clickable: true,
      },
      breakpoints: {
        // Адаптивность
        320: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        890: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  });



document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tabs__button');
    const cards = document.querySelectorAll('.card');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Убираем активный класс у всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('tabs__button--active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('tabs__button--active');

            const category = this.getAttribute('data-category');

            // Показываем/скрываем карточки в зависимости от категории
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const stages = document.querySelectorAll('.stage');
    const rightColumn = document.querySelector('.stages__right');

    if (!stages.length || !rightColumn) return;

    // Создаем элемент для отображения заголовка с параллаксом
    const titleElement = document.createElement('div');
    titleElement.className = 'stages__current-title';
    rightColumn.appendChild(titleElement);




    // Функция обновления активного stage
    function updateActiveStage() {
        const viewportCenter = window.scrollY + (window.innerHeight / 2);
        let activeStage = null;

        stages.forEach(stage => {
            const rect = stage.getBoundingClientRect();
            const stageTop = rect.top + window.scrollY;
            const stageBottom = stageTop + rect.height;

            if (viewportCenter >= stageTop && viewportCenter <= stageBottom) {
                activeStage = stage;
            }
        });

        stages.forEach(stage => stage.classList.remove('stage--active'));

        if (activeStage) {
            const title = activeStage.querySelector('.stage__title')?.textContent;
            if (title) {
                titleElement.textContent = title;
                activeStage.classList.add('stage--active');

                // Параллакс-эффект
                const rect = activeStage.getBoundingClientRect();
                const progress = (window.innerHeight/2 - rect.top) / rect.height;
                const parallaxOffset = progress * 30 - 15; // +/-15px диапазон
                titleElement.style.transform = `translateY(calc(-50% + ${parallaxOffset}px))`;
            }
        }
    }

    // Инициализация
    if (stages.length > 0) {
        stages[0].classList.add('stage--active');
        const firstTitle = stages[0].querySelector('.stage__title')?.textContent;
        if (firstTitle) titleElement.textContent = firstTitle;
    }

    // Оптимизированный обработчик скролла
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const now = Date.now();
        if (now - lastScroll > 50) { // Ограничение 20 FPS
            updateActiveStage();
            lastScroll = now;
        }
    }, {passive: true});
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');

    if (!form) return;

    // Маска для телефона
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const errorElement = field.closest('.form-group').querySelector('.form-error');

            if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
                errorElement.textContent = 'Это поле обязательно для заполнения';
                field.classList.add('invalid');
                isValid = false;
            } else {
                errorElement.textContent = '';
                field.classList.remove('invalid');
            }
        });

        // Валидация email (если добавите поле email)
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            const errorElement = emailField.closest('.form-group').querySelector('.form-error');
            errorElement.textContent = 'Введите корректный email';
            emailField.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            // Эмуляция отправки формы
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Отправка...</span>';

            // Здесь должна быть реальная отправка (AJAX, Fetch API)
            setTimeout(() => {
                form.innerHTML = `
          <div class="form-success">
            <svg viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3>Спасибо за заявку!</h3>
            <p>Мы свяжемся с вами в ближайшее время</p>
          </div>
        `;
            }, 1500);
        }
    });

    // Анимация при фокусе
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').querySelector('.form-label').classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').querySelector('.form-label').classList.remove('focused');
            }
        });
    });
});


// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gallery image lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Implement your lightbox functionality here
            console.log('Opening lightbox for:', this.src);
        });
    });

    // Animate stats on scroll
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);

            if (isVisible && !stat.dataset.animated) {
                stat.dataset.animated = 'true';
                // Add animation class or trigger counting animation
            }
        });
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on load
});


// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields');
            return;
        }

        // Here you would typically send the data to your server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();

        // In a real implementation, you would use fetch() to send the data
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Thank you for your message!');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your form');
        });
        */
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item h3');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        // Initialize - hide all answers except first
        if (item !== faqItems[0]) {
            item.nextElementSibling.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainHeroImage');
    

    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Удаляем active класс у всех миниатюр
                document.querySelectorAll('.thumbnail').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Добавляем active класс текущей миниатюре
                this.classList.add('active');
                
                // Меняем основное изображение
                const newImageSrc = this.getAttribute('data-image');
                mainImage.src = newImageSrc;
                
                // Добавляем анимацию перехода
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                    mainImage.style.transition = 'opacity 0.3s ease';
                }, 100);
            });
        });
    }
});

