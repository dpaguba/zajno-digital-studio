document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1 "
    );

    const COUNTER_DURATION = 2000;
    const COUNTER_END_VALUE = 100;
    const COUNTER_UPDATE_INTERVAL = 300;

    const splitTextIntoSpans = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            const text = element.innerText;
            const splitText = text
                .split("")
                .map(char => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
                .join("");
            element.innerHTML = splitText;
        });
    };

    const animateCounter = () => {
        const counterElement = document.querySelector(".counter p");
        let currentValue = 0;
        const startTime = Date.now();

        const updateCounter = () => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < COUNTER_DURATION) {
                currentValue = Math.min(
                    currentValue + Math.floor(Math.random() * 30) + 5,
                    COUNTER_END_VALUE
                );
                counterElement.textContent = currentValue;
                setTimeout(updateCounter, COUNTER_UPDATE_INTERVAL);
            } else {
                counterElement.textContent = COUNTER_END_VALUE;
                gsap.to(counterElement, {
                    y: -20,
                    duration: 1,
                    ease: "power3.inOut",
                    onStart: revealLandingPage,
                    delay: 0.5
                });
            }
        };

        updateCounter();
    };

    const revealLandingPage = () => {
        const timeline = gsap.timeline();

        timeline
            .to(".hero", {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                duration: 2,
                ease: "hop"
            })
            .to(".hero", {
                transform: "translate(-50%, -50%) scale(1)",
                duration: 2.25,
                ease: "power3.inOut"
            }, "-=1.75")
            .to(".overlay", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 2,
                ease: "hop"
            }, "-=2")
            .to(".hero-img img", {
                transform: "scale(1)",
                duration: 2.25,
                ease: "power3.inOut"
            }, "-=2")
            .to(".header h1 span", {
                y: 0,
                stagger: 0.1,
                duration: 2,
                ease: "power4.inOut"
            }, "-=1.75");
    };

    splitTextIntoSpans(".header h1");

    gsap.to(".counter p", {
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1,
        onComplete: animateCounter
    });
});