document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const appCards = document.querySelectorAll('.app-card');
    const modal = document.getElementById('appModal');
    const modalAppName = document.getElementById('modalAppName');
    const modalAppDesc = document.getElementById('modalAppDesc');
    const confirmLaunch = document.getElementById('confirmLaunch');
    const cancelLaunch = document.getElementById('cancelLaunch');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.getElementById('searchInput');
    const viewAllApps = document.getElementById('viewAllApps');
    const goHome = document.getElementById('goHome');
    const settingsBtn = document.getElementById('settingsBtn');
    const helpLink = document.getElementById('helpLink');
    const supportLink = document.getElementById('supportLink');
    const communityLink = document.getElementById('communityLink');
    
    let currentApp = null;
    
    // Навигация по разделам
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            const category = this.getAttribute('data-category');
            
            // Убираем активный класс у всех элементов
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Добавляем активный класс к текущему элементу
            this.classList.add('active');
            
            // Показываем соответствующий раздел
            if (section) {
                contentSections.forEach(sectionEl => {
                    sectionEl.classList.remove('active');
                });
                document.getElementById(`${section}-section`).classList.add('active');
            }
            
            // Если это категория, фильтруем приложения
            if (category) {
                // В реальном приложении здесь была бы фильтрация
                showNotification(`Показаны приложения категории: ${category}`);
            }
        });
    });
    
    // Запуск приложения
    appCards.forEach(card => {
        card.addEventListener('click', function() {
            const appName = this.querySelector('.app-name').textContent;
            const appDesc = this.querySelector('.app-desc').textContent;
            currentApp = this.getAttribute('data-app');
            
            modalAppName.textContent = `Запуск ${appName}`;
            modalAppDesc.textContent = `Вы уверены, что хотите запустить "${appName}"? ${appDesc}`;
            modal.style.display = 'flex';
        });
    });
    
    // Управление модальным окном
    confirmLaunch.addEventListener('click', function() {
        modal.style.display = 'none';
        if (currentApp) {
            showNotification(`Приложение "${currentApp}" запускается...`);
            // Здесь будет реальный запуск приложения
            setTimeout(() => {
                showNotification(`Приложение "${currentApp}" успешно запущено!`);
            }, 1500);
        }
    });
    
    cancelLaunch.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Поиск
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showNotification(`Поиск: ${query}`);
                this.value = '';
            }
        }
    });
    
    // Просмотр всех приложений
    viewAllApps.addEventListener('click', function() {
        navItems.forEach(item => item.classList.remove('active'));
        document.querySelector('[data-section="apps"]').classList.add('active');
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById('apps-section').classList.add('active');
    });
    
    // Переход на главную
    goHome.addEventListener('click', function() {
        navItems.forEach(item => item.classList.remove('active'));
        document.querySelector('[data-section="home"]').classList.add('active');
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById('home-section').classList.add('active');
    });
    
    // Открытие настроек
    settingsBtn.addEventListener('click', function() {
        navItems.forEach(item => item.classList.remove('active'));
        document.querySelector('[data-section="settings"]').classList.add('active');
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById('settings-section').classList.add('active');
    });
    
    // Футер ссылки
    helpLink.addEventListener('click', function() {
        showNotification('Открыта справка');
    });
    
    supportLink.addEventListener('click', function() {
        showNotification('Открыт раздел поддержки');
    });
    
    communityLink.addEventListener('click', function() {
        showNotification('Открыто сообщество');
    });
    
    // Функция показа уведомления
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = 'var(--accent)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Убираем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Анимация карточек при загрузке
    const cards = document.querySelectorAll('.app-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});