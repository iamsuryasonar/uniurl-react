import s from './Welcome_page.module.css';
import image from '../../assets/home_screen_main_image.jpg'
import Footer from '../../components/Footer/Footer'

function WelcomePage() {
    return (
        <>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.text_container}>
                        <p className={s.quote}>All links at your username.</p>
                        <p className={s.quoteExplain}>One link for every other links. Now Share all your links by your username.</p>
                    </div>
                    <img className={s.main_image} src={image}></img>
                </div>
                <div className={s.main_paragraph}>
                    <p className={s.paragraph_tag}>Share your favorite websites and links with ease using URLShare. Whether you're a researcher, content creator, or simply want to save and organize your digital discoveries, we've got you covered.</p>
                </div>
            </div>
        </>
    );
}

export default WelcomePage;