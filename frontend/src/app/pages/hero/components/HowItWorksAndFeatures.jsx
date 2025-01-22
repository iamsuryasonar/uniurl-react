import Feature from "./Feature";

function HowItWorksAndFeatures() {
    return (
        <div className='flex flex-col gap-6 p-0 md:p-6 bg-slate-50 rounded-md'>
            <div className="w-full flex flex-col md:grid md:grid-cols-4 gap-2 text-black p-3 rounded-md ">
                <h1 className='text-black font-bold text-2xl mb-1'>How It Works ?</h1>
                <div className='md:col-start-2 md:col-end-5 flex flex-col gap-1 text-slate-500'>
                    <p>Sign up and create your unique username.</p>
                    <p>Customize your page with a theme that suits your style.</p>
                    <p>Start adding and managing your URLs in one convenient place.</p>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='p-3 text-black font-bold text-xl'>Why UniURL?</p>
                <div className='flex flex-col md:grid md:grid-cols-4 gap-2'>
                    <Feature title='Unique Usernames' text='Each user gets a unique username for their profile URL' />
                    <Feature title='Customizable Themes' text='Choose from 11 curated themes to personalize your page' />
                    <Feature title='Easy Sharing' text='Share multiple URLs on a single page effortlessly' />
                    <Feature title='Community Engagement' text='Connect with like-minded users and discover new content effortlessly' />
                </div>
            </div>
        </div >
    )
}


export default HowItWorksAndFeatures;