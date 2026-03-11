// Made by Utku Gökyer
let currentDate = new Date();
let manualTime = null;
let timeOffset = 0;
let stopwatchInterval = null;
let stopwatchTime = 0;
let countdownInterval = null;
let countdownTime = 0;
let pomodoroInterval = null;
let pomodoroTime = 25 * 60;
let manualTimeSetAt = Date.now();

document.addEventListener('DOMContentLoaded', function() {
    checkDeviceTime();
    updateClock();
    setInterval(updateClock, 1000);
    renderCalendar();
    updateTimezoneConverter();
    
    document.querySelectorAll('.main-nav .nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            if (section) {
                showSection(section);
                
                document.querySelectorAll('.main-nav .nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });
    
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('setTimeBtn').addEventListener('click', setManualTime);
    
    document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
    document.getElementById('stopStopwatch').addEventListener('click', stopStopwatch);
    document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);
    
    document.getElementById('startCountdown').addEventListener('click', startCountdown);
    document.getElementById('stopCountdown').addEventListener('click', stopCountdown);
    document.getElementById('resetCountdown').addEventListener('click', resetCountdown);
    
    document.getElementById('fromTime').addEventListener('change', updateTimezoneConverter);
    document.getElementById('fromTimezone').addEventListener('change', updateTimezoneConverter);
    document.getElementById('toTimezone').addEventListener('change', updateTimezoneConverter);

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const minutes = parseInt(btn.dataset.time);
            pomodoroTime = minutes * 60;
            updatePomodoroDisplay();
            
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    // Made by Utku Gökyer
    document.getElementById('startPomodoro').addEventListener('click', startPomodoro);
    document.getElementById('stopPomodoro').addEventListener('click', stopPomodoro);
    document.getElementById('resetPomodoro').addEventListener('click', resetPomodoro);
    
    updateWorldClocks();
    setInterval(updateWorldClocks, 60000);
    createParticles();
});

function checkDeviceTime() {
    fetch('https://timeapi.io/api/Time/current/zone?timeZone=Europe/Istanbul')
        .then(response => {
            if (!response.ok) throw new Error('API failed');
            return response.json();
        })
        .then(data => {
            const ntpTime = new Date(data.dateTime);
            const deviceTime = new Date();
            
            timeOffset = ntpTime - deviceTime;
            
            if (timeOffset > 5000) {
                const secondsBehind = Math.floor(timeOffset / 1000);
                const minutes = Math.floor(secondsBehind / 60);
                const seconds = secondsBehind % 60;
                
                let message = `⚠️ Cihaz saatiniz ${secondsBehind} saniye geride!`;
                if (minutes > 0) {
                    message = `⚠️ Cihaz saatiniz ${minutes} dakika ${seconds} saniye geride!`;
                }
                
                setTimeout(() => {
                    showNotification(message);
                }, 1000);
            }
        })
        .catch(error => {
            console.log('NTP time check skipped');
        });
}

function updateClock() {
    let now;
    
    if (manualTime) {
        now = new Date(manualTime.getTime() + (Date.now() - manualTimeSetAt));
    } else if (timeOffset !== 0) {
        now = new Date(Date.now() + timeOffset);
    } else {
        now = new Date();
    }
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('tr-TR', options);
    document.getElementById('dateDisplay').textContent = dateStr;
    
    const hourDeg = (now.getHours() % 12) * 30 + (now.getMinutes() / 60) * 30;
    const minuteDeg = now.getMinutes() * 6 + (now.getSeconds() / 60) * 6;
    const secondDeg = now.getSeconds() * 6;
    
    document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${secondDeg}deg)`;
}

function setManualTime() {
    const hours = parseInt(document.getElementById('setHours').value);
    const minutes = parseInt(document.getElementById('setMinutes').value);
    const seconds = parseInt(document.getElementById('setSeconds').value);
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        showNotification('⚠️ Lütfen geçerli bir saat girin!');
        return;
    }
    
    manualTime = new Date();
    manualTime.setHours(hours, minutes, seconds, 0);
    manualTimeSetAt = Date.now(); // Made by Utku Gökyer
    
    document.getElementById('setHours').value = '';
    document.getElementById('setMinutes').value = '';
    document.getElementById('setSeconds').value = '';
    
    showNotification('✅ Saat başarıyla ayarlandı!');
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                       'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = prevLastDay.getDate();
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = daysInPrevMonth - i;
        calendarGrid.appendChild(day);
    }
    
    const today = manualTime ? manualTime : (timeOffset ? new Date(Date.now() + timeOffset) : new Date());
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        if (year === today.getFullYear() && 
            month === today.getMonth() && 
            i === today.getDate()) {
            day.classList.add('today');
        }
        
        calendarGrid.appendChild(day);
    }

    const totalCells = calendarGrid.children.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = i;
        calendarGrid.appendChild(day);
    }
}

function updateWorldClocks() {
    const cities = [
        { name: 'Londra', timezone: 'Europe/London' },
        { name: 'New York', timezone: 'America/New_York' },
        { name: 'Tokyo', timezone: 'Asia/Tokyo' },
        { name: 'Sydney', timezone: 'Australia/Sydney' }
    ];
    // Made by Utku Gökyer
    document.querySelectorAll('.timezone-time').forEach(el => {
        const timezone = el.dataset.timezone;
        try {
            const time = new Date().toLocaleTimeString('tr-TR', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit'
            });
            el.textContent = time;
        } catch (e) {
            el.textContent = '--:--';
        }
    });
    
    const grid = document.querySelector('.world-clocks-grid');
    if (grid.children.length === 0) {
        cities.forEach((city) => {
            const clock = document.createElement('div');
            clock.className = 'world-clock-item';
            try {
                clock.innerHTML = `
                    <h4>${city.name}</h4>
                    <div class="time">${new Date().toLocaleTimeString('tr-TR', {
                        timeZone: city.timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}</div>
                    <div class="date">${new Date().toLocaleDateString('tr-TR', {
                        timeZone: city.timezone,
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })}</div>
                `;
            } catch (e) {
                clock.innerHTML = `
                    <h4>${city.name}</h4>
                    <div class="time">--:--:--</div>
                    <div class="date">N/A</div>
                `;
            }
            grid.appendChild(clock);
        });
    } else {
        Array.from(grid.children).forEach((clock, index) => {
            const time = clock.querySelector('.time');
            const date = clock.querySelector('.date'); // Made by Utku Gökyer
            try {
                time.textContent = new Date().toLocaleTimeString('tr-TR', {
                    timeZone: cities[index].timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                date.textContent = new Date().toLocaleDateString('tr-TR', {
                    timeZone: cities[index].timezone,
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
            } catch (e) {
                time.textContent = '--:--:--';
                date.textContent = 'N/A';
            }
        });
    }
}

function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 10);
    }
}

function stopStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 360000);
    const minutes = Math.floor((stopwatchTime % 360000) / 6000);
    const seconds = Math.floor((stopwatchTime % 6000) / 100);
    
    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('stopwatchDisplay').textContent = display;
}

function startCountdown() {
    if (!countdownInterval) {
        const hours = parseInt(document.getElementById('countdownHours').value) || 0;
        const minutes = parseInt(document.getElementById('countdownMinutes').value) || 0;
        const seconds = parseInt(document.getElementById('countdownSeconds').value) || 0;
        
        if (countdownTime === 0) {
            countdownTime = (hours * 3600 + minutes * 60 + seconds) * 100;
        }
        
        if (countdownTime === 0) {
            showNotification('⚠️ Lütfen geçerli bir süre girin!');
            return;
        }
        
        countdownInterval = setInterval(() => {
            countdownTime--;
            updateCountdownDisplay();
            
            if (countdownTime <= 0) {
                stopCountdown();
                showNotification('⏰ Süre doldu!');
            }
        }, 10);
    }
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function resetCountdown() {
    stopCountdown();
    countdownTime = 0;
    updateCountdownDisplay();
}

function updateCountdownDisplay() {
    const totalSeconds = Math.floor(countdownTime / 100);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('countdownDisplay').textContent = display;
}

function startPomodoro() {
    if (!pomodoroInterval) {
        pomodoroInterval = setInterval(() => {
            pomodoroTime--;
            updatePomodoroDisplay();
            
            if (pomodoroTime <= 0) {
                stopPomodoro();
                showNotification('🍅 Pomodoro tamamlandı!');
            }
        }, 1000);
    }
}

function stopPomodoro() {
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
}
// Made by Utku Gökyer
function resetPomodoro() {
    stopPomodoro();
    const activeMode = document.querySelector('.mode-btn.active');
    const minutes = parseInt(activeMode.dataset.time);
    pomodoroTime = minutes * 60;
    updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('pomodoroDisplay').textContent = display;
}

function updateTimezoneConverter() {
    const fromTimezone = document.getElementById('fromTimezone').value;
    const toTimezone = document.getElementById('toTimezone').value;
    const fromTime = document.getElementById('fromTime').value;
    
    if (fromTime) {
        try {
            const [hours, minutes] = fromTime.split(':');
            const now = new Date();
            now.setHours(parseInt(hours));
            now.setMinutes(parseInt(minutes));
            
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: toTimezone
            };
            
            const convertedTime = now.toLocaleTimeString('tr-TR', options);
            document.getElementById('convertedTime').textContent = convertedTime;
        } catch (e) {
            document.getElementById('convertedTime').textContent = '--:--';
        }
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function createParticles() {
    const particlesBg = document.getElementById('particles-bg');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.4 + 0.2};
            will-change: transform;
        `;
        particlesBg.appendChild(particle);
    }
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #f093fb);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
// Made by Utku Gökyer
// Made by Utku Gökyer