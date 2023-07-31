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
}

function closeModal() {
	const modal = document.querySelector('.modal');
	if (modal) {
		modal.classList.remove('open');
		modal.addEventListener('transitionend', () => {
			document.body.removeChild(modal);
		});
	}
}

