'use client';
import { motion } from "framer-motion";
import {  useRef, useState } from "react";
const MagHover = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    const mouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        let ver = top + (height / 2);
        let hor = left + (width / 2);
        if (clientX < hor && clientY < ver) {
            setPosition({ x: -10, y: -10 })
        }
        else if (clientX > hor && clientY > ver) {
            setPosition({ x: 10, y: 10 })
        }
        else if (clientX < hor && clientY > ver) {
            setPosition({ x: -10, y: 10 })
        }
        else if (clientX > hor && clientY < ver) {
            setPosition({ x: 10, y: -10 })
        }
        else if (clientX < hor) {
            setPosition({ ...position, x: -10 })
        }
        else if (clientX > hor) {
            setPosition({ ...position, x: 10 })
        }
        else if (clientY < ver) {
            setPosition({ ...position, y: -10 })
        }
        else if (clientY > ver) {
            setPosition({ ...position, y: 10 })
        }
    }

    const mouseLeave = () => {
        setPosition({
            x: 0,
            y: 0
        })
    }
    const { x, y } = position;
    return (
        <motion.div
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            ref={ref}
            animate={{ x, y }}
            transition={{
                type: "spring",
                stiffness: 80
            }}  
        >
            {
                children
            }
        </motion.div>
    )
}

export default MagHover