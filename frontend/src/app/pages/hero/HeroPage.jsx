
import Header from './components/Header'
import HowItWorksAndFeatures from './components/HowItWorksAndFeatures';
import CTA from './components/Cta';

function HeroPage() {
    return (
        <>
            <div className='w-full py-10 md:py-[4rem] md:px-[6rem] flex flex-col gap-4'>
                <Header />
                <HowItWorksAndFeatures />
                <CTA />
            </div>
        </>
    );
}

export default HeroPage;






