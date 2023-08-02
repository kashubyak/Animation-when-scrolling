//Animation Cite!
let options = {
	root: null,
	rootMargin: '5px',
	threshold: 0.3,
};
let targets = document.querySelectorAll('._anim-items');
let callback = function (entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('_active');
		} else {
			if (!entry.target.classList.contains('_anim-no-hide')) {
				entry.target.classList.remove('_active');
			}
		}

	});
}
let observer = new IntersectionObserver(callback, options);
targets.forEach(target => {
	observer.observe(target);
});

//Swiper!
new Swiper('.card', {
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	grabCursor: true,
	keyboard: {
		onlyInViewport: true,
	},
	slidesPerView: 3,
	loop: true,
	spaceBetween: 30,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		680: {
			slidesPerView: 2,
		},
		1030: {
			slidesPerView: 3,
		},
	}
});

//Modal window!
function openModal(imageSrc, imageName) {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	modal.innerHTML = `
	<span class="close-btn" onclick="closeModal()">&times;</span>
	<img src="${imageSrc}" alt="${imageName}">`;

	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeModal();
		}
	});
	document.body.appendChild(modal);
	requestAnimationFrame(() => {
		modal.classList.add('open');
	});
};
function closeModal() {
	const modal = document.querySelector('.modal');
	if (modal) {
		modal.classList.remove('open');
		modal.addEventListener('transitionend', () => {
			document.body.removeChild(modal);
		});
	}
};

/// Lazy loading

// const lazyImages = document.querySelectorAll('img[data-src]');
// const map = document.querySelector('.map');
// const windowHeight = document.documentElement.clientHeight;
// let lazyImagesPosition = [];
// if (lazyImages.length > 0) {
// 	lazyImages.forEach(img => {
// 		if (img.dataset.src || img.dataset.srcset) {
// 			lazyImagesPosition.push(img.getBoundingClientRect().top + scrollY);
// 			lazyScrollCheck();
// 		}
// 	});
// }
// window.addEventListener("scroll", function () {
// 	console.log('work')
// 	lazyScrollCheck();
// });
// function lazyScroll() {
// 	console.log('work')
// 	lazyScrollCheck();
// }
// function lazyScrollCheck() {
// 	let imgIndex = lazyImagesPosition.findIndex(
// 		item => scrollY > item - windowHeight
// 	);
// 	if (imgIndex >= 0) {
// 		if (lazyImages[imgIndex].dataset.src) {
// 			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
// 			lazyImages[imgIndex].removeAttribute('data-src');
// 		}
// 		delete lazyImagesPosition[imgIndex];
// 	}
// }

// Lazy load 
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyMaps = document.querySelectorAll('.map[data-map] > div[data-src]');

const lazyLoad = (target, src) => {
	const io = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				if (target.tagName === 'IMG') {
					target.src = src; // Присваиваем src для изображения
				} else if (target.tagName === 'DIV') {
					target.innerHTML = `<iframe src="${src}" frameborder="0" style="border:0; width: 100%; height: 100%;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`; // Вставляем iframe для карты
				}
				observer.unobserve(target);
			}
		});
	});

	io.observe(target);
};

lazyImages.forEach(image => {
	lazyLoad(image, image.getAttribute('data-src'));
});

lazyMaps.forEach(map => {
	lazyLoad(map, map.getAttribute('data-src'));
});

