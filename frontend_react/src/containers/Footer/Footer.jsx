import React, { useState } from 'react';

import { images } from '../../constants/';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { username, email, message } = formData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: formData.username,
            email: formData.email,
            message: formData.message,
        };

        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <h2 className="head-text">Contactez moi</h2>

            <div className="app__footer-cards">
                <div className="app__footer-card ">
                    <img src={images.email} alt="email" />
                    <a href="mailto:lebec.owen@yahoo.fr" className="p-text">lebec.owen@yahoo.fr</a>
                </div>
                <div className="app__footer-card ">
                    <img src={images.pdf} alt="email" />
                    <a href={images.cv} target={"_blank"} className="p-text">Mon CV</a>
                </div>
            </div>
            {!isFormSubmitted ? (
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Votre nom" name="username" value={username} onChange={handleChangeInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="email" placeholder="Votre mail" name="email" value={email} onChange={handleChangeInput} />
                    </div>
                    <div>
            <textarea
                className="p-text"
                placeholder="Votre message"
                value={message}
                name="message"
                onChange={handleChangeInput}
            />
                    </div>
                    <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Envoyer le message' : 'Envoie...'}</button>
                </div>
            ) : (
                <div>
                    <h3 className="head-text">
                        Merci de m'avoir contacté, je vous répondrai dans les plus brefs délais.
                    </h3>
                </div>
            )}
        </>
    );
};

export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__primarybg',
);