
import Header from './components/Header'
import HowItWorksAndFeatures from './components/HowItWorksAndFeatures';
import CTA from './components/Cta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faDollar, faHashtag, faImages, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import Slider from '../../components/Slider';

function HeroPage() {

    return (
        <>
            <div className='w-full py-10 md:py-[4rem] md:px-4 flex flex-col gap-4 text-black'>
                <Header />
                <Slider speed={60} className='w-full bg-black text-white'>
                    <UseCaseItem icon={faStarOfLife} title={'Shout-out Video'} />
                    <UseCaseItem icon={faHashtag} title={'Social Media'} />
                    <UseCaseItem icon={faArrowRight} title={'Tutorials'} />
                    <UseCaseItem icon={faStarOfLife} title={'Influencer'} />
                    <UseCaseItem icon={faDollar} title={'Affiliation'} />
                    <UseCaseItem icon={faImages} title={'Gallery'} />
                </Slider>
                <HowItWorksAndFeatures />
                <CTA />
            </div>
        </>
    );
}

export default HeroPage;

function UseCaseItem({ icon, title }) {
    return <div className='flex justify-start items-center gap-2 md:gap-6 py-2 px-4 md:px-8 mx-2 md:mx-4 text-nowrap md:text-xl font-extrabold'>
        <FontAwesomeIcon icon={icon} />
        <p>{title}</p>
    </div>
}






