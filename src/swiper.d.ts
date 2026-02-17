import { SwiperContainer, SwiperSlide } from 'swiper/element';

declare global {
	namespace svelteHTML {
		interface IntrinsicElements {
			'swiper-container': any; // або детальніше: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & SwiperContainer;
			'swiper-slide': any;
		}
	}
}

export {};
