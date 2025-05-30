import { FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';

const BlogDetailsHero = ({ blog }) => {
  if (!blog) return null; // or loading fallback

  return (
    <div
      className="w-full md:h-[70vh] h-[60vh] bg-cover bg-center relative "
      style={{ backgroundImage: `url(${blog.coverImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

      <div className="absolute bottom-3 left-5 right-5 md:left-10 md:right-10 z-10 p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2">
            <div className=''>
              <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-sm">
              {blog.title}
            </h1>
            </div>
            
            <div className='flex justify-start gap-x-5'>
               <span className="flex items-center space-x-1">
              <span className="flex items-center gap-x-2 text-white">
                <FiCalendar className="text-base" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </span>
            </span>


            <span className="flex items-center gap-x-2 text-white">
              <BiCategory className="text-base" />
              <span>{blog.category}</span>
            </span>
            </div>
           
          </div>


          <div>
            <span className="flex items-center gap-x-2 text-white">
              <FiUser className="text-base" />
              <p className="text-sm text-white ">{blog.author}</p>
            </span>
          </div>


        </div>
      </div>
    </div>
  );
};

export default BlogDetailsHero;
