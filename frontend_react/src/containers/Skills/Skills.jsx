import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [filterSkills, setFilterSkills] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Front-End');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

    useEffect(() => {
        const query = '*[_type == "experiences"]';
        const skillsQuery = '*[_type == "skills"]';

        client.fetch(query).then((data) => {
            setExperiences(data);
        });

        client.fetch(skillsQuery).then((data) => {
            setSkills(data);
            setFilterSkills(data.filter((skill) => skill.tags.includes("Front-End")));
        });
    }, []);

    const handleSkillsFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);
            setFilterSkills(skills.filter((skill) => skill.tags.includes(item)));

        }, 500);
    };

    return (
        <>
            <h2 className="head-text">Compétences & Expérience</h2>
            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    <div className="app__skills-filter">
                        {['Front-End', 'Back-End', 'BDD', 'Programmation', 'Autres'].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSkillsFilter(item)}
                                className={`app__skills-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    {filterSkills.map((skill, index) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            className="app__skills-item app__flex"
                            key={index}
                        >
                            <div
                                className="app__flex"
                                style={{ backgroundColor: skill.bgColor }}
                            >
                                <img src={urlFor(skill.icon)} alt={skill.name} />
                            </div>
                            <p className="p-text">{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="app__skills-exp">
                    {experiences.map((experience, index) => (
                        <motion.div
                            className="app__skills-exp-item"
                            key={index}
                        >
                            <div className="app__skills-exp-year">
                                <p className="bold-text">{experience.year}</p>
                            </div>
                            <motion.div className="app__skills-exp-works">
                                {experience.works.map((work, index) => (
                                    <>
                                        <motion.div
                                            whileInView={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                            className="app__skills-exp-work"
                                            data-tip
                                            data-for={work.name}
                                            key={index}
                                        >
                                            <h4 className="bold-text">{work.name}</h4>
                                            <p className="p-text">{work.company}</p>
                                        </motion.div>
                                        <ReactTooltip
                                            id={work.name}
                                            effect="solid"
                                            arrowColor="#fff"
                                            className="skills-tooltip"
                                        >
                                            {work.desc}
                                        </ReactTooltip>
                                    </>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'compétences',
    'app__whitebg',
);