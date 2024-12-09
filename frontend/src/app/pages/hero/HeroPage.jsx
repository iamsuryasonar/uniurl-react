
import Header from './components/Header'
import HowItWorksAndFeatures from './components/HowItWorksAndFeatures';
import CTA from './components/Cta';
import AuthService from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';

function HeroPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const navigate = useNavigate();

    if (code) {
        (async () => {
            await AuthService.googleLogin({ code: code });
            navigate(0);
        })();
    }
    return (
        <>
            {code ?
                <div className='w-full min-h-screen flex items-center justify-center text-white font-bold animate-pulse'>Authenticating please wait...</div>
                :
                <div className='w-full py-10 md:py-[4rem] md:px-[6rem] flex flex-col gap-4'>
                    <Header />
                    <HowItWorksAndFeatures />
                    <CTA />
                </div>
            }
        </>
    );
}

export default HeroPage;






