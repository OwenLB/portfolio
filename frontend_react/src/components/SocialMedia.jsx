import React from 'react';
import {BsLinkedin, BsGithub} from 'react-icons/bs';
import {IoMdMail} from 'react-icons/io';

const SocialMedia = () => (
    <div className="app__social">
        <a href="mailto:lebec.owen@yahoo.fr">
            <div>
                <IoMdMail/>
            </div>
        </a>
        <a href="https://www.linkedin.com/in/owenlb/" target={"_blank"}>
            <div>
                <BsLinkedin/>
            </div>
        </a>
        <a href="https://github.com/OwenLB" target={"_blank"}>
            <div>
                <BsGithub/>
            </div>
        </a>
    </div>
);

export default SocialMedia;