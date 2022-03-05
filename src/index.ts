import * as PIXI from 'pixi.js';
import { CardDemo } from './scenes/CardDemo';
import { FPSCounter } from './scenes/FPSCounter';
import { ParticleDemo } from './scenes/ParticleDemo';
import { TextDemo } from './scenes/TextDemo';
import { Sprite } from 'pixi.js';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
            .add([
                'assets/logo.png',
                'assets/front.png',
                'assets/back.png',
                'assets/button.png',
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

    // Set scene
    var scene1 = new ParticleDemo(app);
    app.stage.addChild(scene1);
    scene1.visible = false;

    var scene2 = new CardDemo(app);
    app.stage.addChild(scene2);

    var scene3 = new TextDemo(app);
    app.stage.addChild(scene3);

    var fpsCounter = new FPSCounter(app);
    app.stage.addChild(fpsCounter);

    let button1 = new Sprite(app.loader.resources['assets/button.png'].texture);
    let button2 = new Sprite(app.loader.resources['assets/button.png'].texture);
    let button3 = new Sprite(app.loader.resources['assets/button.png'].texture);
    app.stage.addChild(button1);
    app.stage.addChild(button2);
    app.stage.addChild(button3);

    button1.position.set(20, 20);
    button1.position.set(100, 20);
    button1.position.set(200, 20);
};

main();
