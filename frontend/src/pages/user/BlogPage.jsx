import ReusableHero from "../../components/reusable/ReusableHero"
import BlogSection from "../../components/HomeSection/HomePage/BlogSection"

const BlogPage = () => {
    return (
        <div className='pb-15'>
            <ReusableHero 
                title="Blog"
            />
            <BlogSection isHomePage={false}/>
        </div>
    )
}

export default BlogPage
