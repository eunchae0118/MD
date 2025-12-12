// DOM 요소들
const header = document.querySelector('.header');
const quickMenu = document.getElementById('quickMenu');
const quickToggle = document.getElementById('quickToggle');
const quickPanel = document.getElementById('quickPanel');
const topButton = document.getElementById('topButton');
const tabBtns = document.querySelectorAll('.tab-btn');
const noticeNavPrev = document.querySelector('.notice-nav.prev');
const noticeNavNext = document.querySelector('.notice-nav.next');

// 헤더 스크롤 효과
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Top 버튼 표시/숨김
    if (currentScroll > 300) {
        topButton.classList.add('visible');
    } else {
        topButton.classList.remove('visible');
    }
    
    // 헤더 배경 효과
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Quick Menu 토글
if (quickToggle && quickPanel) {
    quickToggle.addEventListener('click', () => {
        quickPanel.classList.toggle('open');
    });
}

// Top 버튼 클릭
if (topButton) {
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 탭 전환
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ISU 페이지 연도별 탭 스크롤 이동
const isuYearTabs = document.querySelectorAll('.isu-year-tab');
const filterBtns = document.querySelectorAll('.isu-table-filter .filter-btn');

// 스크롤 이동 함수
function scrollToTable(targetId) {
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 86;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 연도별 탭 클릭 이벤트
isuYearTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 모든 탭에서 active 클래스 제거
        isuYearTabs.forEach(t => t.classList.remove('active'));
        // 클릭한 탭에 active 클래스 추가
        tab.classList.add('active');
        
        // 해당 표로 스크롤 이동
        const targetId = tab.getAttribute('data-target');
        scrollToTable(targetId);
    });
});

// 필터 버튼 클릭 이벤트
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 해당 표로 스크롤 이동
        const targetId = btn.getAttribute('data-target');
        scrollToTable(targetId);
    });
});

// 공지사항 네비게이션
let currentNoticeIndex = 0;
const noticeItems = document.querySelectorAll('.notice-item');
const totalNotices = noticeItems.length;

function updateNoticeVisibility() {
    noticeItems.forEach((item, index) => {
        if (window.innerWidth > 768) {
            item.style.display = 'flex';
        } else {
            item.style.display = index === currentNoticeIndex ? 'flex' : 'none';
        }
    });
}

if (noticeNavPrev) {
    noticeNavPrev.addEventListener('click', () => {
        currentNoticeIndex = (currentNoticeIndex - 1 + totalNotices) % totalNotices;
        updateNoticeVisibility();
    });
}

if (noticeNavNext) {
    noticeNavNext.addEventListener('click', () => {
        currentNoticeIndex = (currentNoticeIndex + 1) % totalNotices;
        updateNoticeVisibility();
    });
}

// 반응형 처리
window.addEventListener('resize', updateNoticeVisibility);

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer 설정
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// 과정 카드 애니메이션
const courseCards = document.querySelectorAll('.course-card, .course-card-large');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

courseCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    cardObserver.observe(card);
});

// 퀵 링크 애니메이션
const quickItems = document.querySelectorAll('.quick-item');
const quickObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, observerOptions);

quickItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    quickObserver.observe(item);
});

// 공지사항 아이템 애니메이션
const noticeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, observerOptions);

noticeItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    noticeObserver.observe(item);
});

// 페이지 로드 완료 시 초기화
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    updateNoticeVisibility();
    
    // 초기 스크롤 위치에 따른 UI 상태 설정
    if (window.pageYOffset > 300) {
        topButton.classList.add('visible');
    }
});

// 히어로 비디오 로드 처리
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(() => {
            console.log('비디오 자동 재생 실패');
        });
    });
    
    heroVideo.addEventListener('error', () => {
        console.log('비디오 로드 실패');
    });
}

// 콘솔 메시지
console.log('🎓 신한대학교 마이크로디그리대학 홈페이지가 로드되었습니다.');
