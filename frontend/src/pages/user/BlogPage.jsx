import ReusableHero from "../../components/reusable/ReusableHero"
import BlogSection from "../../components/HomeSection/HomePage/BlogSection"
import img from '../../assets/image/blog/blog-hero.png'

const BlogPage = () => {
    return (
        <div className='pb-15'>
            <ReusableHero 
                title="The Travel Journal"
                bgImage={img}
            />
            <BlogSection isHomePage={false}/>
        </div>
    )
}

export default BlogPage
