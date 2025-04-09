import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import './styles.css';

export default function Footer() {
	const linkedin = "https://www.linkedin.com/in/julian-c-3a4314b2/";
	const mailto = "mailto:julianchrispeels@gmail.com"
	return (
		<footer className="footer">
			<div className='contact-info'>
				<div className='contact-title'>
					Contact Info:
				</div>

				<div className='contact-email'>
					<FontAwesomeIcon icon={faEnvelope} className='email-icon' /><a href={mailto} target="_blank" rel="noreferrer">julianchrispeels@gmail.com</a>
				</div>

				<div className='contact-linkedin'>
					<FontAwesomeIcon icon={faLinkedin} className='linkedin-icon' /><a href={linkedin} target="_blank" rel="noreferrer">Linkedin</a>
				</div>

				<div className='contact-text'>
					<p><FontAwesomeIcon icon={faReact} className='react-icon' />This website was created with React.js</p>
				</div>
			</div>
		</footer>
	);
}