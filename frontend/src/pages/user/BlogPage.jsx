import heroImage from '../../assets/image/hero/lagoon-landscape.jpg';
import ReusableHero from "../../components/reusable/ReusableHero"
import BlogSection from "../../components/HomeSection/HomePage/BlogSection"

const BlogPage = () => {
    return (
        <div className=''>
            <ReusableHero 
                bgImage={heroImage}
                title="Blog"
            />
            <BlogSection isHomePage={false}/>
        </div>
    )
}

export default BlogPage
