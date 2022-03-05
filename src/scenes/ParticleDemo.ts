import { TextStyle, Text, Application, Container, Sprite } from 'pixi.js';
import particles = require('pixi-particles');

export class ParticleDemo extends Container {
    private app: Application;
    private sprite: Sprite;
    private myEmitter: particles.Emitter;
    private fpsText: PIXI.Text;

    constructor(app: Application) {
        super();
        this.app = app;
        this.update = this.update.bind(this);

        const emitterContainer = new Container();
        this.addChild(emitterContainer);

        const style = new TextStyle({ fill: 'white' });
        this.fpsText = new Text('0', style);
        emitterContainer.addChild(this.fpsText);

        this.sprite = new Sprite(
            this.app.loader.resources['assets/logo.png'].texture
        );

        let config: any = {
            alpha: {
                list: [
                    {
                        value: 0.8,
                        time: 0,
                    },
                    {
                        value: 0.1,
                        time: 1,
                    },
                ],
                isStepped: false,
            },
            emit: true,
            scale: {
                list: [
                    {
                        value: 1,
                        time: 0,
                    },
                    {
                        value: 0.3,
                        time: 1,
                    },
                ],
                isStepped: false,
            },
            color: {
                list: [
                    {
                        value: 'FB8E2D',
                        time: 0,
                    },
                    {
                        value: 'f5b830',
                        time: 1,
                    },
                ],
                isStepped: false,
            },
            speed: {
                list: [
                    {
                        value: 200,
                        time: 0,
                    },
                    {
                        value: 100,
                        time: 1,
                    },
                ],
                isStepped: false,
            },
            startRotation: {
                min: 0,
                max: 360,
            },
            rotationSpeed: {
                min: 0,
                max: 0,
            },
            lifetime: {
                min: 0.5,
                max: 1,
            },
            frequency: 0.008,
            spawnChance: 1,
            particlesPerWave: 1,
            emitterLifetime: 0.31,
            maxParticles: 1000,
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
            emitterContainer,
            this.sprite.texture,
            config
        );

        this.myEmitter.updateOwnerPos(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        this.fpsText.position.set(100, 100);

        // Handle update
        this.app.ticker.add(this.update);
    }

    update(_: any, delta: number) {
        this.myEmitter.emit = true;
        this.myEmitter.update(0.009);
        this.fpsText.text =
            this.fpsText.text +
            '\n' +
            this.myEmitter.particleCount +
            ' Particles';
    }
}
