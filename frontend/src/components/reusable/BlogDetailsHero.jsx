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
          <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-sm">
            {blog.title}
          </h1>
          <p className="text-sm text-white md:hidden">{blog.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsHero;
