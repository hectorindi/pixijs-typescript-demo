import * as PIXI from 'pixi.js';
import { Application, Container, Sprite, Texture } from 'pixi.js';
import { TweenMax, TimelineLite, gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
const plugins = [PixiPlugin];
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export class TextDemo extends Container {
    private app: Application;
    private textContainer: Container;
    constructor(app: Application) {
        super();
        this.app = app;
        this.textContainer = new Container();
        this.addChild(this.textContainer);

        this.textContainer.pivot.set(
            this.textContainer.width / 2,
            this.textContainer.height / 2
        );

        this.textContainer.position.set(
            window.innerWidth / 2 - 600,
            window.innerHeight / 2 - 50
        );
    }
}
