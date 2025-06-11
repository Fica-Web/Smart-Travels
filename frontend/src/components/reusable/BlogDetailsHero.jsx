import { FiCalendar, FiUser } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';

const BlogDetailsHero = ({ blog }) => {
  if (!blog) return null;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Background Hero Image */}
      <div
        className="w-full md:h-[70vh] h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${blog.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        {/* Content inside image */}
        <div className="absolute bottom-3 left-1 right-3 md:left-10 md:right-10 z-10 p-4">
          <div className="flex justify-between items-center">
            {/* Left */}
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-sm">
                {blog.title}
              </h1>

              {/* Combined Category + Date on md+ screens, only Category on mobile */}
              <div className="flex flex-col md:flex-row md:items-center md:gap-x-5 text-white text-sm">
                <div className="flex items-center gap-x-2">
                  <BiCategory className="text-base" />
                  <span>{blog.category}</span>
                </div>

                {/* Date: shown next to category only on md+ */}
                <div className="hidden md:flex items-center gap-x-2">
                  <FiCalendar className="text-base" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>



            {/* Author: only visible on desktop */}
            <div className="hidden md:flex items-center gap-x-2 text-white text-sm">
              <FiUser className="text-base" />
              <span>{blog.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only: show Date + Author outside the image */}
      <div className="block md:hidden px-5 pt-4">
        <div className="flex justify-between text-sm text-secondary-blue/90">
          <div className="flex items-center gap-x-2">
            <FiCalendar className="text-base" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FiUser className="text-base" />
            <span>{blog.author}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsHero;
