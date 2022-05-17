import React from "react";
import { View } from "react-native-animatable";

export const AnimationTypes = {
    in: {
        fadeIn: "fadeIn",
        fadeInUp: "fadeInUp",
        fadeInLeft: "fadeInLeft",
        fadeInRight: "fadeInRight",
        fadeInDown: "fadeInDown",
        bounceIn: "bounceIn",
        bounceInDown: "bounceInDown",
        bounceInUp: "bounceInUp",
        bounceInLeft: "bounceInLeft",
        bounceInRight: "bounceInRight",
        slideInDown: "slideInDown",
        slideInUp: "slideInUp",
        slideInLeft: "slideInLeft",
        slideInRight: "slideInRight",
        zoomIn: "zoomIn",
        zoomInDown: "zoomInDown",
        zoomInUp: "zoomInUp",
        zoomInLeft: "zoomInLeft",
        zoomInRight: "zoomInRight",
    },
    out: {
        fadeOut: "fadeOut",
        fadeOutUp: "fadeOutUp",
        fadeOutLeft: "fadeOutLeft",
        fadeOutRight: "fadeOutRight",
        fadeOutDown: "fadeOutDown",
        bounceOut: "bounceOut",
        bounceOutDown: "bounceOutDown",
        bounceOutUp: "bounceOutUp",
        bounceOutLeft: "bounceOutLeft",
        bounceOutRight: "bounceOutRight",
        slideOutDown: "slideOutDown",
        slideOutUp: "slideOutUp",
        slideOutLeft: "slideOutLeft",
        slideOutRight: "slideOutRight",
    },
    rotateDown: {
        0: {
            rotate: "0deg",
        },
        1: {
            rotate: "90deg",
        },
    },
    rotateUp: {
        0: {
            rotate: "0deg",
        },
        1: {
            rotate: "270deg",
        },
    },
};

const AnimatedView = (props) => {
    const animation = props.animation || AnimationTypes.in.fadeIn;

    return (
        <View
            useNativeDriver
            {...props}
            animation={animation}
            duration={props.duration || 450}
            delay={props.delay || 0}
        >
            {props.children}
        </View>
    );
};

export default AnimatedView;
