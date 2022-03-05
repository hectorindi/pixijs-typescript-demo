import * as PIXI from 'pixi.js';
import { CardDemo } from './scenes/CardDemo';
import { FPSCounter } from './scenes/FPSCounter';
import { ParticleDemo } from './scenes/ParticleDemo';
import { TextDemo } from './scenes/TextDemo';
import { Sprite, Text, TextStyle, Container } from 'pixi.js';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
            .add([
                'assets/logo.png',
                'assets/front.png',
                'assets/back.png',
                'assets/button.png',
                'assets/icon1.png',
                'assets/icon2.png',
                'assets/icon3.png',
                'assets/icon4.png',
                'assets/icon5.png',
            ])
            .load(() => {
                resolve();
            });
    });
};

const main = async () => {
    // Main app
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', (e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    // Load assets
    await load(app);
    document.body.appendChild(app.view);

    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    var fpsCounter = new FPSCounter(app);
    app.stage.addChild(fpsCounter);

    // Set scene
    var particleDemo = new ParticleDemo(app, fpsCounter.fpsText);
    app.stage.addChild(particleDemo);
    particleDemo.startEmitter();

    var textDemo = new TextDemo(app);
    app.stage.addChild(textDemo);
    textDemo.visible = false;

    var cardDemo = new CardDemo(app);
    app.stage.addChild(cardDemo);
    cardDemo.visible = false;

    let startX = 10;

    let labels = ['Fire Demo', 'Text Demo', 'Card Demo'];
    const buttonContainer = new Container();
    app.stage.addChild(buttonContainer);

    for (let i = 0; i < 3; i++) {
        let button = new Sprite(
            app.loader.resources['assets/button.png'].texture
        );
        buttonContainer.addChild(button);
        button.scale.set(0.5, 0.5);
        button.position.set(startX + i * 250, 20);
        const style = new TextStyle({ fill: 'white' });
        let buttonText = new Text(labels[i], style);
        buttonText.position.set(button.x + 70, button.y + 100);
        buttonContainer.addChild(buttonText);
        button.interactive = true;
        button.name = `button${i}`;
        button.buttonMode = true;
        button.on('pointerdown', onButtonDown);
    }

    function onButtonDown(evt: any) {
        if (evt.currentTarget.name === 'button0') {
            particleDemo.visible = true;
            particleDemo.startEmitter();
            textDemo.visible = false;
            cardDemo.visible = false;
        } else if (evt.currentTarget.name === 'button1') {
            particleDemo.visible = false;
            textDemo.visible = true;
            cardDemo.visible = false;
            particleDemo.destroyparticles();
        } else if (evt.currentTarget.name === 'button2') {
            particleDemo.visible = false;
            textDemo.visible = false;
            cardDemo.visible = true;
            particleDemo.destroyparticles();
        }
    }
};

main();
