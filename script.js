// Установка текущего года в футере
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Переменные для мобильного меню
let mobileMenuOpen = false;
let activeSection = 'home';

// Функция для плавной прокрутки к секции
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80; // Высота фиксированного хедера
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Обновляем активную секцию
        activeSection = sectionId;
        updateActiveNavLinks();
        
        // Закрываем мобильное меню если открыто
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Функция для переключения мобильного меню
function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        mobileMenuBtn.querySelector('.menu-icon').textContent = '✕';
    } else {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('.menu-icon').textContent = '☰';
    }
}

// Функция для обновления активных ссылок в навигации
function updateActiveNavLinks() {
    // Убираем active со всех ссылок в основной навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Убираем active со всех ссылок в мобильном меню
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Убираем active со всех ссылок в футере
    document.querySelectorAll('.footer-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Добавляем active на текущую секцию
    document.querySelectorAll(`.nav-link[data-section="${activeSection}"]`).forEach(link => {
        link.classList.add('active');
    });
    
    document.querySelectorAll(`.mobile-nav-link[data-section="${activeSection}"]`).forEach(link => {
        link.classList.add('active');
    });
    
    document.querySelectorAll(`.footer-nav-link[data-section="${activeSection}"]`).forEach(link => {
        link.classList.add('active');
    });
}

// Функция для определения активной секции при скролле
function updateActiveSectionOnScroll() {
    const sections = ['home', 'courses', 'projects', 'practice', 'self-development', 'about'];
    const scrollPosition = window.scrollY + 100; // Добавляем отступ для хедера
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                if (activeSection !== section) {
                    activeSection = section;
                    updateActiveNavLinks();
                }
                break;
            }
        }
    }
}

// Добавляем обработчики событий для всех кнопок навигации
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для основной навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
    
    // Обработчики для мобильного меню
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
    
    // Обработчики для кнопок в футере
    document.querySelectorAll('.footer-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
    
    // Обработчики для кнопок в hero секции
    document.querySelectorAll('.scroll-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
    
    // Обработчик для кнопки мобильного меню
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    
    // Обработчик скролла для обновления активной секции
    window.addEventListener('scroll', updateActiveSectionOnScroll);
    
    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenuOpen && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            toggleMobileMenu();
        }
    });
    
    // Инициализация активной секции
    updateActiveSectionOnScroll();
});