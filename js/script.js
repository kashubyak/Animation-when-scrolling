//Parallax Background 
window.onload = function () {
	const parallaxBody = document.querySelector('.parallax-body')
	if (parallaxBody) {
		const content = document.querySelector('.header_text');
		const clouds = document.querySelector('.images-parallax_clouds');
		const mountains = document.querySelector('.images-parallax_mountains');
		const human = document.querySelector('.images-parallax_human');
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;
		const speed = 0.05;
		let positionX = 0, positionY = 0;
		let coordXProcent = 0, coordYProcent = 0;
		function setMouseParallaxStyle() {
			const distX = coordXProcent - positionX;
			const distY = coordYProcent - positionY;
			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`
			human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`
			requestAnimationFrame(setMouseParallaxStyle)
		}
		setMouseParallaxStyle();
		parallaxBody.addEventListener('mousemove', function (event) {
			const parallaxWidght = parallaxBody.offsetWidth;
			const parallaxHeight = parallaxBody.offsetHeight;
			const coordX = event.pageX - (parallaxWidght / 2);
			const coordY = event.pageY - (parallaxHeight / 2);
			coordXProcent = coordX / parallaxWidght * 100;
			coordYProcent = coordY / parallaxHeight * 100;
		});
	}
}


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
