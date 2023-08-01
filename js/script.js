//Animation Cite!
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((window.pageYOffset > (animItemOffset - animItemPoint)) && window.pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXoffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYoffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
	setTimeout(() => {
		animOnScroll();
	}, 500);
}

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

