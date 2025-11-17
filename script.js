const birthDate = new Date('2006-02-15T00:00:00');

function calculateAge() {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function updateAge() {
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
}

function getNextBirthday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    if (today > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    
    return nextBirthday;
}

function updateCountdown() {
    const now = new Date();
    const nextBirthday = getNextBirthday();
    const timeDiff = nextBirthday - now;
    
    if (timeDiff <= 0) {
        updateAge();
        document.getElementById('birthdayMessage').textContent = 'Happy Birthday!';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    const birthdayYear = nextBirthday.getFullYear();
    const turningAge = birthdayYear - birthDate.getFullYear();
    document.getElementById('birthdayMessage').textContent = `Time until turning ${turningAge}`;
}

function checkBirthday() {
    const today = new Date();
    const isBirthday = today.getMonth() === birthDate.getMonth() && 
                       today.getDate() === birthDate.getDate();
    
    if (isBirthday) {
        updateAge();
        const messageElement = document.getElementById('birthdayMessage');
        if (messageElement) {
            messageElement.textContent = 'Happy Birthday!';
            messageElement.style.animation = 'pulse 1s infinite';
        }
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

function initializeWebsite() {
    updateAge();
    updateCountdown();
    checkBirthday();
    
    setInterval(() => {
        updateCountdown();
        checkBirthday();
    }, 1000);
    
    hideLoader();
}

window.addEventListener('load', hideLoader);
document.addEventListener('DOMContentLoaded', initializeWebsite);
