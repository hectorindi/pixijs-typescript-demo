import { TextStyle, Text, Application, Container, Sprite } from 'pixi.js';
import particles = require('pixi-particles');

export class ParticleDemo extends Container {
    private app: Application;
    private sprite: Sprite;
    private myEmitter: particles.Emitter;
    private fpsText: Text;
    private emitterContainer: Container;
    private config: any;

    constructor(app: Application, fpsText: Text) {
        super();
        this.app = app;
        this.fpsText = fpsText;
        this.sprite = new Sprite(
            this.app.loader.resources['assets/logo.png'].texture
        );
        this.emitterContainer = new Container();
        this.addChild(this.emitterContainer);

        this.sprite = new Sprite(
            this.app.loader.resources['assets/logo.png'].texture
        );

        this.config = {
            alpha: {
                start: 0.62,
                end: 0,
            },
            scale: {
                start: 0.5,
                end: 1.5,
                minimumScaleMultiplier: 1,
            },
            color: {
                start: '#fff191',
                end: '#ff622c',
            },
            speed: {
                start: 500,
                end: 600,
                minimumSpeedMultiplier: 1.5,
            },
            acceleration: {
                x: 0,
                y: 0,
            },
            maxSpeed: 0,
            startRotation: {
                min: 265,
                max: 275,
            },
            noRotation: false,
            rotationSpeed: {
                min: 50,
                max: 50,
            },
            lifetime: {
                min: 0.1,
                max: 0.75,
            },
            blendMode: 'normal',
            frequency: 0.001,
            emitterLifetime: -1,
            maxParticles: 10,
            pos: {
                x: 0,
                y: 0,
            },
            addAtBack: false,
            spawnType: 'circle',
            spawnCircle: {
                x: 0,
                y: 0,
                r: 10,
            },
        };
        this.myEmitter = new particles.Emitter(
            this.emitterContainer,
            this.sprite.texture,
            this.config
        );
    }

    startEmitter() {
        this.update = this.update.bind(this);
        this.myEmitter = new particles.Emitter(
            this.emitterContainer,
            this.sprite.texture,
            this.config
        );

        this.myEmitter.updateOwnerPos(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        // Handle update
        this.app.ticker.add(this.update);
    }

    destroyparticles() {
        this.myEmitter.destroy();
        this.app.ticker.remove(this.update);
    }

    update(_: any, delta: number) {
        this.myEmitter.emit = true;
        this.myEmitter.update(0.009);
        this.fpsText &&
            (this.fpsText.text =
                this.fpsText.text +
                '\n' +
                this.myEmitter.particleCount +
                ' Particles');
    }
}
