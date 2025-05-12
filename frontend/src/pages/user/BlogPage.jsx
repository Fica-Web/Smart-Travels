import heroImage from '../../assets/image/hero/lagoon-landscape.jpg';
import ReusableHero from "../../components/reusable/ReusableHero"

const BlogPage = () => {
    return (
        <div className=''>
            <ReusableHero 
                bgImage={heroImage}
                title="Blog"
            />
        </div>
    )
}

export default BlogPage
