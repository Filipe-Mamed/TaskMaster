import { FaGithub } from "react-icons/fa";

import { FaLinkedin } from "react-icons/fa";
import React, { useState } from "react";

const EstiloGitHub = () => {
    const [hover, setHover] = useState(false);

    const iconStyle = {
        color: hover ? "#0077b5" : "white",
        transition: "color 0.3s",
    };

    return (
        <FaGithub
            style={iconStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
    );
};

export default EstiloGitHub;