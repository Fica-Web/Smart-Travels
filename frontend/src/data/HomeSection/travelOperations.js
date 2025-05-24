import img1 from '../../assets/icons/icon1.svg'
import img2 from '../../assets/icons/icon2.svg'
import img3 from '../../assets/icons/icon3.svg'
import img4 from '../../assets/icons/icon4.svg'
import img5 from '../../assets/icons/icon5.svg'
import img6 from '../../assets/icons/icon6.svg'
import img1Active from '../../assets/icons/hoverIcon1.svg'
import img2Active from '../../assets/icons/hoverIcon2.svg'
import img3Active from '../../assets/icons/hoverIcon3.svg'
import img4Active from '../../assets/icons/hoverIcon4.svg'
import img5Active from '../../assets/icons/hoverIcon5.svg'
import img6Active from '../../assets/icons/hoverIcon6.svg'



export const travelOptions = [
  { icon: img1, activeIcon: img6Active, title: 'Flights', route: '/bookings/flights' },
  { icon: img2, activeIcon: img5Active, title: 'Hotels', route: '/bookings/hotels' },
  { icon: img3, activeIcon: img4Active, title: 'Visa', route: '/bookings/visa' },
  { icon: img5, activeIcon: img2Active, title: 'Umrah Package', mobileTitle: 'Umrah', route: '/bookings/umrah' },
  { icon: img4, activeIcon: img3Active, title: 'Trips', route: '/bookings/trips' },
  { icon: img6, activeIcon: img1Active, title: 'Travel Insurance', mobileTitle: 'Insurance', route: '/bookings/insurance' },
];
