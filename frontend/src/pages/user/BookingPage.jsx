import { Outlet } from 'react-router-dom';
import ReusableHero from '../../components/reusable/ReusableHero';
import TopIcons from '../../components/HomeSection/BookingPage/TopIcons';
import img from '../../assets/image/booking/booking-hero.jpg';

const BookingPage = () => {
  return (
    <div>
      <ReusableHero title="Start Your Journey" bgImage={img} />
      <div className="relative md:-mt-8 mt-5 md:z-10">
        <TopIcons />
      </div>
      {/* Render the child route component here */}
      <div className='py-10 px-6 md:px-20'>
        <Outlet />
      </div>
    </div>
  );
};

export default BookingPage;