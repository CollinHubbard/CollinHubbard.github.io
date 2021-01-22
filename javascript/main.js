body {
    font-family: Roboto;

    margin: 0 auto;

    background-color: #191919;

}

.top-banner {
    position: fixed;

    top: 0;
    left: 0;
    width: 100%;

    background-color: #DFE2DB;
    height: 20vh;

    content: "";

    z-index: 10;

    clip-path: polygon(
        0 0,
        100% 0,
        100% 50%,
        90% 100%,
        0 100%
    );

     background-image: url('street.jpg');
}

.top-nav {
    display: flex;
    position: absolute;
    left: 45%;
    top: 20%;
    transform: translate(-50%, 0);
}

.p-nav {
    position: relative;

    top: -1px;

    z-index: 0;

    padding: .25em 10vw;
    background-color: #DFE2DB;

    white-space: nowrap;

    margin: 0 2em;

    clip-path: polygon(
        0 0,
        100% 0,
        100% 60%,
        95% 100%,
        5% 100%,
        0 60%
    );

    user-select: none;

    border: none;
}

.p-nav:hover {
    background-color: #fff47a;
}

.p-nav:focus {
    outline: none;
}

.descript {
    height: 60vh;
    margin: 1.5em 1.5em;

    border: 3px solid black;

    border-radius: 10px;

    padding: .8em;

    background-color: #DFE2DB;

}

.text {
    font-size: calc(1vh + .75vw);

}


#resume {
    display: block;

    position: absolute;

    top: 100vh;

    left: 23vw;

    transition: all .2s ease-in-out;
}

#resume:hover {
    transform: scale(1.1);

    box-shadow: 0 0 60px #4b4b4b;

    transition: all .2s ease-in-out;
}

.special {

    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    top: 215vh;

    background-color: #191919;

    height: 6vh;

}

.spBtn {
    background-color: #fff47a;

    height: 8vh;
    width: 16vw;

    clip-path: polygon(
        0 0,
        100% 0,
        90% 100%,
        0% 100%,
        10% 0%
    );

    transform: scale(1.09);

    border: none;

    transition: all .3s linear;

    font-size: 36px;

    font-family: Ariel;

    text-align: center;
    text-decoration: none;

}

.spBtn:focus {
    outline: none;

    background-color: #191919;

    transition: all .3s linear;

    transform: scale(1.15, 1.09);
}
